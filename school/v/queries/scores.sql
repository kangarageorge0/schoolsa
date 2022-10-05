with org as (
    select 
        grade.name as grade,
        stage.`year` as stage,
        stream.name as stream,
        student.name as student,
        json_objectagg(subject.`id`, score.`value`) as score
    from 
        score
        inner join progress on score.progress = progress.progress
        inner join student on  progress.student = student.student
        inner join subject on score.subject = subject.subject
        inner join stage on progress.stage = stage.stage
        inner join stream on stage.stream = stream.stream
        inner join grade on stream.grade= grade.grade
        where grade.name='4'
    group by
        stage, stream, student
)
select grade, stage, stream, student, 
    score->>"$.maths" as maths,
    score->>"$.eng" as english,
    score->>"$.hygiene" as hygiene,
    score->>"$.env" as environment,
    score->>"$.cre" as cre,
    score->>"$.kiswa" as kis,
    score->>"$.ss" as sst,
    score->>"$.art" as art,
    score->>"$.music" as music,
    score->>"$.phe" as phe,
    score->>"$.sci" as sci
from org;






