

with org as (
    select 
        exam.name as exam,
        stream.name as stream,
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
    group by
        exam,  stream
) 
select exam,  stream, 
    score->>"$.eng" as english
from org;