
with org as (
    select 
        exam.name as exam,
        stage.`year` as stage,
        stream.name as stream,
        student.name as student,
        grade.name as grade,
        json_objectagg(subject.`id`, score.`percent`) as score
      
    from 
        score
        inner join progress on score.progress = progress.progress
        inner join student on  progress.student = student.student
        inner join subject on score.subject = subject.subject
        inner join sitting on score.sitting = sitting.sitting
        inner join exam on sitting.exam =exam.exam
        inner join stage on progress.stage = stage.stage
        inner join stream on stage.stream = stream.stream
        inner join grade on stream.grade =grade.grade
    group by
        exam, stage, stream, student,grade 
) 
select exam, stage, stream, student, grade,
    score->>"$.maths" as maths,
    score->>"$.eng" as english,
    score->>"$.hyg" as hygene,
    score->>"$.env" as environment,
    score->>"$.cre" as cre,
    score->>"$.kiswa" as kiswahili
from org;
 
select  grade,percent from score

select * from score ;



