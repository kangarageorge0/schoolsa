 CREATE TRIGGER before_score_insert 
    AFTER INSERT ON score
    FOR EACH ROW 
 INSERT INTO changes (pk, table_name, operation)
            values(new.score, 'score', 'insert')


