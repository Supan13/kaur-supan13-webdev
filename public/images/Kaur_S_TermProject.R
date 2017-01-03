#get the working directory
getwd()

#loading package RSQLite and lubridate
library(RSQLite)
library(lubridate)

#loading and parsing FoodInspections.csv file from working directory
FoodInspectionsdata <- read.csv("FoodInspections.csv", header=TRUE,na.strings="")

#creating dataframe
FoodInspectionsDF <- data.frame(FoodInspectionsdata)


#get the column names
colnames(FoodInspectionsDF)

#get rid of the periods"." from column names
colnames(FoodInspectionsDF) <- gsub(pattern="[.]", replacement = "", x=colnames(FoodInspectionsDF))

#merging the columns city, state, zip to address
FoodInspectionsDF$Address <- do.call(paste0, FoodInspectionsDF[c("Address","City","State","Zip")])

#get rid of columns city and state except zipcode
FoodInspectionsDF$City <- NULL
FoodInspectionsDF$State <- NULL

#need to do some cleaning of the data
#get rid of special characters from all the rows of dataframe
FoodInspectionsDF$Risk <- gsub(pattern="\\d",replacement="",x=FoodInspectionsDF$Risk)
FoodInspectionsDF$Risk <- gsub(pattern="\\(",replacement="",x=FoodInspectionsDF$Risk)
FoodInspectionsDF$Risk <- gsub(pattern="\\)",replacement="",x=FoodInspectionsDF$Risk)
FoodInspectionsDF$Risk <- gsub(pattern="Risk",replacement="",x=FoodInspectionsDF$Risk)

#parsing the InspectionDate column
FoodInspectionsDF$InspectionDate <- as.Date(FoodInspectionsDF$InspectionDate, "%m/%d/%Y")

#Extracting the years
FoodInspectionsDF$InspectionDate <- year(FoodInspectionsDF$InspectionDate)

#get rid of repeated values for FacilityType
FoodInspectionsDF$FacilityType <- gsub(pattern="DAY CARE 1023",replacement="DAYCARE 1023",x=FoodInspectionsDF$FacilityType)
FoodInspectionsDF$FacilityType <- gsub(pattern="GROCERY",replacement="Grocery Store",x=FoodInspectionsDF$FacilityType)
FoodInspectionsDF$FacilityType <- gsub(pattern="LIQUOR STORE",replacement="Liquor",x=FoodInspectionsDF$FacilityType)
FoodInspectionsDF$FacilityType <- gsub(pattern="PRIVATE SCHOOL",replacement="Private School",x=FoodInspectionsDF$FacilityType)
FoodInspectionsDF$FacilityType <- gsub(pattern="SCHOOL",replacement="School",x=FoodInspectionsDF$FacilityType)
FoodInspectionsDF$FacilityType <- gsub(pattern="RESTAURANT",replacement="Restaurant",x=FoodInspectionsDF$FacilityType)
FoodInspectionsDF$FacilityType <- gsub(pattern="Restaurant/Bar",replacement="Restaurant",x=FoodInspectionsDF$FacilityType)
FoodInspectionsDF$FacilityType <- gsub(pattern="RESTAURANT/BAR",replacement="Restaurant",x=FoodInspectionsDF$FacilityType)
FoodInspectionsDF$FacilityType <- gsub(pattern="Restaurant/BAR",replacement="Restaurant",x=FoodInspectionsDF$FacilityType)




#creating dataframes to load data into tables
InspectionDF <- data.frame(FoodInspectionsDF[c("InspectionID","InspectionDate","InspectionType","Results","Risk","Violations")])

FoodEstablishmentDF <- data.frame(FoodInspectionsDF[c("License","DBAName","AKAName","FacilityType","Address","Zip","Latitude","Longitude","Location","InspectionID")])

#open a connection to SQLite and create the FoodInspectionsDB database
db <- dbConnect(SQLite(), dbname="FoodInspectionsDB.sqlite")

#In SQLite foreign key constraints are disabled by default, so they must be enabled for 
#each database connection separately by turning pragma foreign_keys=on
dbSendQuery(conn = db, "pragma foreign_keys=on;")


#creating table Inspection wit InspectionID as the primary key
dbSendQuery(conn = db,  "CREATE TABLE Inspection (
            InspectionID INTEGER  NOT NULL PRIMARY KEY,
            InspectionDate DATE, 
            InspectionType TEXT, 
            Risk TEXT,
            Results TEXT,
            Violations TEXT)
            WITHOUT ROWID")

#creating table FoodEstablishment with License as primary key and InspectionID as foreign key
dbSendQuery(conn = db,  "CREATE TABLE FoodEstablishment (
            License INTEGER NOT NULL PRIMARY KEY,
            DBAName TEXT, 
            AKAName TEXT,
            FacilityType TEXT,
            Address TEXT,
            Zip INTEGER,
            Latitude INTEGER,
            Longitude INTEGER,
            Location INTEGER,
            InspectionID INTEGER NOT NULL,
            FOREIGN KEY(InspectionID) REFERENCES Inspection(InspectionID))
            WITHOUT ROWID")

#uploading data into tables
dbWriteTable(conn = db, name = "Inspection", value = InspectionDF, row.names=FALSE, overwrite=TRUE)

dbWriteTable(conn = db, name = "FoodEstablishment", value = FoodEstablishmentDF, row.names=FALSE, overwrite=TRUE)

#list tables
dbListTables(db)

#list field of table
dbListFields(db, "Inspection")
dbListFields(db, "FoodEstablishment")


#setting querries to get some results
dbGetQuery(db, "SELECT COUNT(DBAName)
                FROM FoodEstablishment
                LEFT OUTER JOIN Inspection                
                ON FoodEstablishment.InspectionID = Inspection.InspectionID 
                WHERE FacilityType = 'Restaurant' AND Results = 'Fail'")


dbGetQuery(db, "SELECT COUNT(DBAName)
           FROM FoodEstablishment
           LEFT OUTER JOIN Inspection                
           ON FoodEstablishment.InspectionID = Inspection.InspectionID 
           WHERE FacilityType = 'Hospital' AND Results = 'Fail'")
           

#query to get food inspections categorized by year
dbGetQuery(db, "SELECT COUNT(Results), InspectionDate
                FROM Inspection
                WHERE Results = 'Fail'
                GROUP BY InspectionDate")
              

#query to get results of failed inspections categorized by facility type
dbGetQuery(db, "SELECT  FacilityType, COUNT(Results), InspectionDate
                FROM FoodEstablishment LEFT OUTER JOIN Inspection
                ON FoodEstablishment.InspectionID = Inspection.InspectionID
                WHERE Results = 'Fail' AND InspectionDate = '2015'
                GROUP BY FacilityType 
                ORDER BY COUNT(Results) DESC
                LIMIT 10")


#query to get results of food inspections by zipcode
dbGetQuery(db, "SELECT  Zip, COUNT(Results), InspectionDate
                FROM FoodEstablishment LEFT OUTER JOIN Inspection
                ON FoodEstablishment.InspectionID = Inspection.InspectionID
                WHERE Results = 'Fail' AND InspectionDate = '2015'
                GROUP BY Zip 
                ORDER BY COUNT(Results) DESC
                LIMIT 10")


#close connection
dbDisconnect(db)
