select grade.name as grade
FROM
    allocation
    inner join stage on allocation.stage = stage.stage
    inner join stream on stage.stream = stream.stream
    inner join grade on stream.grade = grade.grade
where name IS NULL;



#Select all the classses in the database
select * from classes;

#sSelect all the claseses in the database that have an empty name
select * from class where name ='';

#Remome reord that has an empty string
delete class.* from class where name ='';
