//Import app from the outlook library.
//
//Resolves reference to the asset.products data type
import * as outlook from '../../../outlook/v/code/outlook.js';
//
//Resolves the app than main extends
import * as app from "../../../outlook/v/code/app.js";
//
//Import the test msg class.
import * as msg from "./msg.js"
//
//Resolves the tree and ear classes
import * as tree from "../../../schema/v/code/tree.js";
import * as ear from "../../../schema/v/code/ear.js";
//
//Import server.
import * as server from "../../../schema/v/code/server.js";

//Resolve references to a database
import * as schema from "../../../schema/v/code/schema.js";

//import {initiate_contract} from "./initiate_contract.js";

import * as lib from "../../../schema/v/code/library";

//
export default class main extends app.app {
    //
    //Initialize the main application.
    constructor(config: app.Iconfig) {
        super(config);
    }
    
    //
    //Retuns all the products that are specific to this application. They are
    //used to exapnd those from the base application
    get_products_specific(): Array<outlook.assets.uproduct> {
        return [
          
            {
                title: "Actions",
                id: 'actions',
                solutions: [
                    {
                        title: "View due assignments",
                        id: "view_due_assignments",
                        listener: ["event", () => this.vue_due_assignments()]
                    },
                    {
                        title: "Manage Events",
                        id: "events",
                        listener: ["crud", 'event', ['review'], '+', "mutall_users"]
                    },
                    {
                        title: "Manage Messages",
                        id: "messages",
                        listener: ["crud", 'msg', ['review'], '+', "mutall_users"]
                    },
                    {
                        title: "Create Message",
                        id: "create_msg",
                        listener: ["event", ()=>{this.new_msg()}]
                    },
                    {
                        title: "View Exam Results",
                        id: "view_exam_results",
                    listener: ["event", async ()=>{
                            //
                            //Create the exam results view, i.e., page;
                            const exam = new view_exam_results(this);
                            //
                            //Display the exam results view 
                            await exam.administer();
                        }]
                    }, 
                    {
                        title: "View Compacted Results",
                        id: "view_compacted_results",
                    listener: ["event", async ()=>{
                            //
                            //Create the exam results view, i.e., page;
                            const exam = new view_compacted_results(this);
                            //
                            //Display the exam results view 
                            await exam.administer();
                        }]
                    },
                    {
                        title: "View Form",
                        id: "view_form",
                    listener: ["event", async ()=>{
                            //
                            //Create the exam results view, i.e., page;
                            const form = new view_form(this);
                            //
                            //Display the exam results view 
                            await form.administer();
                        }]
                    }                   
                ]
            },
            
            {
                title: "Manage Hierarchical Data",
                id: 'hierarchies',
                solutions: [
                    {
                        title: "View Directory",
                        id: "view_directory",
                        listener: ["event", async () => await this.view_directory()]
                    },
                    {
                        title: "View XML File",
                        id: "view_xml",
                        listener: ["event", async ()=>await this.view_xml()]
                    },
                    {
                        title: "View Accounts",
                        id: "view_accounts",
                        listener: ["event", async ()=>await this.view_records()]
                    },
                    {
                        title: "View CAQ",
                        id: "view_caq",
                        listener: ["event", async ()=>await this.view_caq()]
                    },
                    {
                        title: "View Products",
                        id: "view_products",
                        listener: ["event", async ()=>await this.view_services()]
                    },
                    {
                        title: "Viirectory",
                        id: "vieirectory",
                        listener: ["event", async () => await this.view_directory()]
                    }
                ]    
            },
            {
                title: "Manage Hierarchical Data",
                id: 'hierarchies',
                solutions: [
                    {
                        title: "View Directory",
                        id: "view_directory",
                        listener: ["event", async () => await this.view_directory()]
                    },
                    {
                        title: "View XML File",
                        id: "view_xml",
                        listener: ["event", async ()=>await this.view_xml()]
                    },
                    {
                        title: "View Accounts",
                        id: "view_accounts",
                        listener: ["event", async ()=>await this.view_records()]
                    },
                    {
                        title: "View CAQ",
                        id: "view_caq",
                        listener: ["event", async ()=>await this.view_caq()]
                    },
                    {
                        title: "View Products",
                        id: "view_products",
                        listener: ["event", async ()=>await this.view_services()]
                    }
                ]
            },
            
          
        ]
     }
    //
    //Allow the user to create a new message and save it in the database.
    async new_msg(): Promise<void> {
        //
        //1. Create a pop that facilitates sending a new message.
        const Msg = new msg.msg(this);
        //
        //Collect all the data from the user.
        const result: msg.Imsg | undefined = await Msg.administer();
        //
        //Check the validity of the data.
        if (result === undefined) return;
        //
        //Use the questionnare in php class to save the data to the database.
        //
    }
    //
    //List all assignments that are due and have not been reported.
    //Ordered by Date. 
    vue_due_assignments(): void {
        alert("This method is not implemented yet.")
    }
    
    //View the root directory using the tree system
    async view_directory():Promise<void>{
        //
        //Formulate the root nolde
        
        //The root directory is named.... 
        const path:string = "d:/mutall_projects";
        //
        //Get root content of the directory; its not a file 
        const root = new tree.directory.root(path, false);
        //
        //Create a new explorer, using this main page as the mother. Initially,
        //open the /chama folder 
        const Explorer = new tree.explorer(root, this, ['/','chama', 'v','code']);
        //
        //Do the administration and ignore the selection
        await Explorer.administer();

    }
    
    //View an xml document
    async view_xml():Promise<void>{
        //
        //Formulate the (xml) root node
        
        //Get the filename
        const filename:string= "d:/mutall_projects/tracker/v/test/log.xml";
        //
        //Read the file content
        const xml:string = await server.exec(
            'path',
            [filename, true],
            'get_file_contents',
            []
        );
        //
        //Get root content of the xml document 
        const root = new tree.xml.root(xml);
        //
        //Create a new explorer, using this main page as the mother. Display
        //the attributes in the tree view 
        const Explorer = new tree.explorer(root, this);
        //
        //Do the administration and ignore the selection
        await Explorer.administer();

    }
    
    //View records from a hierarchical table in a database
    async view_records():Promise<void>{
        //
        //Formulate the (record) root node
        
        //Formulate the subject
        const subject:tree.subject = {
            dbname:'mutall_users',
            ename:'account'
        };
        //
        //Get root content of a record. Use the 'name' field to access the
        //tagnames. Assume that the process is recursive
        const root = new tree.record.root(subject, 'name', true);
        //
        //Create a new explorer, using this main page as the mother. 
        const Explorer = new tree.explorer(root, this);
        //
        //Do the administration and ignore the selection
        await Explorer.administer();
    }
    
    //View related (non-hierarchical) records from a database based
    //on the mutall-compliant E-A-R model, to support the CAQ project
    async view_caq():Promise<void>{
        //
        //Formulate the root node
        //
        //Define the starting entity name for the  explorer
        const ename = 'school';
        
        //Get the named entity from the current 
        const entity = this.dbase!.entities[ename];
        //
        //Its an error if the entity id not defined
        if (entity===undefined)
            throw new schema.mutall_error(`Entity '${ename}' cannot be found in database ${this.dbase!.name}`);
        //
        //Create the root node
        const root = new ear.root(entity);
        //
        //Create a new explorer, using this main page as the mother.
        const Explorer = new tree.explorer(root, this);
        //
        //Do the administration and ignore the selection
        await Explorer.administer();
    }

    //For saving the last service selected in this application
    public selection?:tree.service.content;

    //View mutall products in a using a tree view
    async view_services(){
        //
        //Convert the this products into tree fashion
        const products:tree.service.products = Array.from(this.products.values());
        //
        //Create the root product node with a defined selection. Do we need
        //to initialize it or not? Perhaps we do to complete its definition 
        //before use. Consider re-using teh last slection if any
        const root = new tree.service.content(
            //
            //The root node is named services
            "services",
            //
            //The root node has no properties
            {},
            //
            //The root node corresponds to the un-indexed (list of) products 
            products,
            //
            //Consider the root node as a product
            true,
            //
            //Te root node has no listener
            undefined,
            //
            //
            //The parent of a root node is undefined
            undefined,
            
        );
        //
        //Do the exploration, and return the new selection
        const Explorer = new tree.explorer(
            //
            //The root product
            root, 
            //
            //The mother page for explorer
            this, 
            //
            //The menu that comes to view initially
            ['hierarchies','view_products']
        );
        //
        //Perform the administraton
        const selection = await Explorer.administer();
        //
        //Save the selection for the next time round, if adminsitrationwas not 
        //aborted 
        if (selection!==undefined) this.selection = <tree.service.content>selection;    

    }

    
}
    //display the school table
class view_exam_results extends outlook.baby<void>{
    //
    //class constructor
    constructor(mother:main){
        super(mother,'./form.html');
    }

    async check(): Promise<boolean> {
        return true;
    }
    async get_result(): Promise<void> {
    }

    //
    //Modify the form template so that the body has the data we
    //are interested in. This data comes from an sql in file 
    ///school/sql/ranking.sql
    public async show_panels(): Promise<void>{
        //
        //2. Get the query to extract results for 1 sitting
        const sql = await server.exec(
            'database', 
            ['school_2', false], 
            'read_sql', 
            ['e:/mutall_projects/school/v/sql/ranking.sql']
        );
        //
        //3. Execute the query to get the results
        const result = await server.exec(
            'database',
            ['school_2', false], 
            'get_sql_data',
            [sql]
        );
       
        //
        //4. Use the results to populate the table
        this.populate_table(result);
       
    }
    
    populate_table(data_rows: lib.Ifuel){
        
        //1.1 Get the table (from this form) whose body we want
        //to clear
        const table =  <HTMLTableElement>this.get_element('result');
        //
        //Get the columns that are in this table. They are in the 3rd row of the
        //tHead section
        //
        //Get the tdhead section
        const thead = table.tHead!;
        //
        //Get the 3rd row of the thead
        const header = thead.rows[2]; 
        //
        //Get the columns in the header, as an array
        const header_cols = Array.from(header.cells);
        //
        //1,2 Get the fist body of the table
        const tbody = table.tBodies[0];
        //
        //1.3 Clear the first table's body
        tbody.innerHTML = "";
        
        //Construct the table.  ets
        for(const data_row of data_rows){
            //
            //For each line, create a new table row
            const table_row = tbody.insertRow();
            
            //For each row put 5 columns
            for(const header_col of header_cols){
                //               
                //Insert a column at the end of the row
                const table_cell = table_row.insertCell(); 
                //
            }
        }

        //Fill the table. The row list indexed by eg.ear, student,
        //{year:2020, student:'Wanguig', raw_values:'......', total:200, ranking:3}
        for(let i=0; i<data_rows.length; i++){
            //
            //Get the data row in the i'th position
            const data_row = data_rows[i];
            //
            //Get the correct table cell where to write the name
            const table_row = tbody.rows[i];
            //
            //Fill the student
            this.fill(data_row, table_row, 'student');
            //
            //
            //Fill the total
            this.fill(data_row, table_row, 'total');
            //
            ////Fill the rank
            this.fill(data_row, table_row, 'ranking');
            
            //Fill the subject area
            //
            //Get the subjects as a string
            const subjects_str = data_row.raw_values;
            //
            //Conver the string of subjects into a javscript object. The subject
            //looks like:
            //[{subject:'eng', grading:'M.E', score:50, percent:100}, ...}
            const subjects = JSON.parse(String(subjects_str));
           
            //
            //Get the subject in the ith position
            for(const subject of subjects){
                //
                //Get the correct table cell where to write the name
                const table_row = tbody.rows[i];
                //
                //
                this.fill_subjects(subject,table_row,'value');
                //
                //Fill percent
                this.fill_subjects(subject,table_row,'percent');
                 //
                 //
                this.fill_subjects(subject,table_row,'grade');
                // 
            }
        }
    }
    
    
    fill(
        data_row:{[index:string]:lib.basic_value}, 
        table_row:HTMLTableRowElement, 
        id:string
    ):void{
        //
        //Get the name of the student;
        let value =String(data_row[id]);
        //
        //1 Get the column that matches the column name
        //
        //1.1Get the header cell that has the id
        const td = <HTMLTableCellElement>this.get_element(id);
        //
        //1.2 Get the cell index of that cell
        const no = td.cellIndex;
        //
        //Get the first cell from the row
        let table_cell = table_row.cells[no];
        //
        //Set the text content of the cell the tudent name
        table_cell.textContent = value;
       

    }
    //
    fill_subjects( 
        subject:{[index:string]:string},
        table_row:HTMLTableRowElement,
        name:'value'|'percent'|'grade'
    ):void{
                //Get the subject id
                let subject_id = subject.subject;
                //
                //Fill the value
                //
                //Formulate the id of the header cell under which this subject falls
                let cell_id = subject_id + '_' + name;
                //
                //Get the cell element that has an id of the form like 'eng_value'
                let td = <HTMLTableCellElement>this.get_element(cell_id);
                //
                //Get the index of the cell
                let no = td.cellIndex;
                //
                //Get the cell from the table wow at the same index as the headr cell
                let table_cell = table_row.cells[no];
                //
                //Set the text content to the subject value
                table_cell.textContent =subject[name];
    }
}

    //display the registration form
class view_form extends outlook.baby<void>{
    //
    //class constructor
    constructor(mother:main){
        super(mother,'./interns_reg-form copy.html');
    }

    async check(): Promise<boolean> {
        return true;
    }
    async get_result(): Promise<void> {
    }

    //
    //Modify the form template so that the body has the data we
    //are interested in. 
    public async show_panels(): Promise<void>{
    }

}

//This represents one row of page 
type page_selection = { 
    sitting:number,
    joint:string, 
    school:string, 
    year:number, 
    stream:string, 
    class:string, 
    exam:string
}


//View exam results in a given sitting
class view_compacted_results extends outlook.baby<void>{
    //
    //The the table we want to fill with the exam results (when we load the page)
    public table?:HTMLTableElement;
    //
    //The data used for filling the tables header is set when we load the page
    public subjects?:Array<{name:string, id:string}>;
    //
    //The data to used to fill the tables body is set when we load the page
    public body?:Array<{student:string, raw_values:string, total:number, ranking:number}>;
    //
    //The row that determines the horizontal size of a tables
    public header?:HTMLTableRowElement;
    //
    //The current sitting key value
    public sitting_key:string="44";
    
    //The sitting data
    public sitting_data?:Array<page_selection>;
    //
    public sitting_selector?:HTMLSelectElement;
    //
    //The class constructor using the empty table template
    constructor(mother:main){
        super(mother,'./table.html');
    }

    async check(): Promise<boolean> {
        return true;
    }
    async get_result(): Promise<void> {
    }
    
    //Create the table that the results will be populated
    public async show_panels(): Promise<void>{
        //
        //Show the items on the page section
        this.show_page();
        //
        //Fill the sitting selector and add the onchange event listener to refres
        //the page
        await this.fill_sitting_selector();
        //
        //Show table
        await this.show_table();
    }
   
    //
    //Show the items on the page section. Here is an example of an item
    //in terms of HTML tags
    /*
        <label>
            <span>School</span>
            <input type="text" id="school" readonly>
        </label>
     */
    show_page():void{
        //
        //Get the page setcion
        const header:HTMLElement = this.get_element('header');
        //
        //Collect as many items as are needed for this display. They are 5, viz.,
        //school, year, etc.
        const items:Array<string> = ['school','year', 'class', 'exam', 'stream' ];
        //
        //For each item create an labeled element as follows:-
        for(const item of items){
            //
            //Use the page section to add the label element
            const label:HTMLElement = this.create_element('label', header);
            //
            //Use the label element to add a span tag showing the name
            //of the item
            const span: HTMLElement = this.create_element('span',label,{textContent:item} );
            //
            //Use the same label element to add the input element whose id is the same as
            //item
            const input: HTMLElement = this.create_element('input', label,{type:'text',id:item,readonly:true});
        }
    }
        
    
    //Display the table that matches the current sitting number
    async show_table():Promise<void>{
        //
        //Set the subject data using the subject sql.
        this.subjects  = await this.get_subject_data();
        //
        //Set the table element
        this.table =  <HTMLTableElement>this.get_element('mytable');
        //
        //Set the body data using the ranking sql.
        this.body = await this.get_body_data();
        //
        //Use the subject data to show the table's header.
        this.show_header();
        //
        //Use the body data to show the table's body.
        this.show_body();
    }
    
    //Fill the sitting selector options with results from out sittinglist query
    //and add the onchange event listener to refres the page
    async fill_sitting_selector():Promise <void>{
        //
        //Read the sql (query) statement from file sittinglist.sql
        const sql:string = await server.exec(
            'database', 
            ['school_2', false], 
            'read_sql', 
            ['e:/mutall_projects/school/v/sql/sittinglist.sql']
        );
        //
        //Execute the query to get results 
        this.sitting_data =<Array<page_selection>> await server.exec(
            'database',
            ['school_2', false], 
            'get_sql_data',
            [sql]
        );
        //
        //Get the sitting selector
        this.sitting_selector = <HTMLSelectElement>this.get_element('selector');
        //
        //Use the results to add options to the selector
        this.fill_sitting();
        //
        //Add the onchange event listener
        this.sitting_selector.onchange = async()=>await this.refresh();
    }
    
   
    //Refresh the page so that the examp results for the new sitting are shown
    async refresh():Promise<void>{
        //
        //Get the selected sitting number to update the sitting property of our 
        //view
        this.sitting_key = this.sitting_selector!.value;
        //
        //Fill the page items, i.e., school, sitting, etc.
        this.fill_page();
        //
        //Show the table
        await this.show_table();
    }
    
    //Use the sitting data and the current sitting selection to complete the
    //page items, i.e., school, sitting, etc.
    fill_page():void{
        //
        //Collect the page items into an array
        const items:Array<keyof page_selection> = [ 'school', 'year', 'class', 'exam', 'stream'];
        //
        //Get the current selection index from the sitting selector
        const current_selection:number = this.sitting_selector!.selectedIndex;
        //
        //Use the selection index to get the corresponding sitting data row
        const row:page_selection = this.sitting_data![current_selection];
        //
        //For each page item....
        for(const item of items){
            //
            //Get the item's value
            const item_value: string|number = row[item];
            //
            //Get the item's input elememt
            const item_element = <HTMLInputElement>this.get_element(item);
            //
            //Set the text content of the input element to the item's value
            item_element.value = String(item_value);
        }
        
    }
    
    
    //
    //Use the the given data  to add options to the given selector
    //Example of a selector filled with options
    /*
        <option value="one">KAPS/2019/8/R</option>
        <option value="two">KAPS/2020/8/R</option>
        <option value="three">KAPS/2019/7/R</option>
        <option value="four">KAPS/2019/7/Y</option>
     */
    fill_sitting():void{
        //
        //For each data element...
        for (const {sitting, joint} of this.sitting_data!){
            //
            //Create the option element for the sitting selector
            this.create_element(
                //
                //The name of the element
                'option',
                //
                //Add the option to the selector
                this.sitting_selector,
                //
                {
                    //
                    //Set Option value to the sitting number
                    value:String(sitting),
                    //
                    //Set the text content of the option to the joint string
                    textContent:joint
                }    
            )
        }
    }
    
    //Get the subject data using the subject sql.
    async get_subject_data():Promise<Array<{name:string, id:string}>>{
        //
        //Compile the sql that exracts the subject name and id, i.e., subjects sql
        const sql:string = `
            select
                subject.id,
                subject.name,
                performance.out_of
            from performance
                inner join subject on performance.subject=subject.subject
                inner join sitting on performance.sitting=sitting.sitting
            where sitting.sitting=${this.sitting_key}
        `;
        //
        //Execute the sql to the the data
        let data:Array<{name:string, id:string}> = await server.exec(
            'database',
            ['school_2', false], 
            'get_sql_data',
            [sql]
        );
        //
        //Return the data
        return data;
    }
    
    //Get the body data using the ranking sql.
    async get_body_data():Promise <Array<{student:string, raw_values:string, total:number, ranking:number}>>{
        //
        //Read the  sql (that extracts the student, raw_values, total and ranking
        //i.e., ranking sql) from the ranking.sql file
        const sql1:string = await server.exec(
            'database', 
            ['school_2', false], 
            'read_sql', 
            ['e:/mutall_projects/school/v/sql/ranking.sql']
        );
        //
        //Replace %s in the sql with the sitting number
        const sql = sql1.replace("%s", this.sitting_key);
        //
        //Execute the sql to retrieve the actual data
        let data:Array<{student:string, raw_values:string, total:number, ranking:number}> = await server.exec(
            'database',
            ['school_2', false], 
            'get_sql_data',
            [sql]
        );
        //
        //Return the extracted data
        return data;
    }
    
    
    
    //Use the subject data to show the header.
    show_header():void{
        //
        //Clear the table header
        this.table!.tHead!.innerHTML="";
        //
        //Show the top row(3 columns, viz., id, raw_values, summary)
        this.show_section_row();
        //
        //Show mid-row (student, subj1, subhj2, ...., subjN, total, rank
        this.show_subject_row();
        //
        //Show the score columns comprising of value/grade/percent triples
        this.show_score_row();
    }
    //4. Use the body data to show the body.
    show_body():void{
        //
        //Clear the body
        this.table!.tBodies[0].innerHTML="";
        //
        //Created the empty table matrix
        this.create_empty_body();
        //
        //Populate the matrix with the body values
        this.fill_body();
    }
    
    //
    //Show the top row. It has 3 columns, viz., id, raw_values, summary. The id
    //column has a span of 1. The raw values column has a span of number of 3
    //times subjects and the summary has a span of 2. The titles for these 3 
    //sections are 'id', 'raw values' and summary, respectively  
    show_section_row():void{
        //
        //Create the (top) section row
        const tr:HTMLTableRowElement =this.table!.tHead!.insertRow();
        //
        //1. Add the id column to the row with a span of 1, and show 'id'
        this.create_element('th', tr, {colSpan:1, textContent:'Id'});       
        //
        //Add the raw_values column to the row. Note:The column span for the 
        //raw_values cell3 times the number of subjects
        this.create_element('th', tr, {colSpan:this.subjects!.length*3, textContent:'Score Values'});       
        // 
        //Add the summary column to the row
        this.create_element('th', tr, {colSpan:2, textContent:'Summary'});       
    } 
       
    //show the subject row that has student row with 1 span, subjects area which 
    //should have as many columns as there are subjects and each column should have
    //3 spans and summary row with 2 spans
    show_subject_row():void{
        //
        //Create the subject row
        const tr: HTMLTableRowElement = this.table!.tHead!.insertRow();
        //
        //Show in the row, the 1st (student) column, with a span of 1
        this.create_element('th', tr);
        //
        //Show as many columns as there are subjects, all with a span of 3 and
        //with subjecy as the text content
        this.show_subject_cells(tr);
        //
        //Show in the row, the last empty column with a span of 2 
        this.create_element('th', tr, {colSpan:2});
    }
    
    //Show as many columns as there are subjects, all with a span of 3 and
    //with subject as the text content
    show_subject_cells(tr:HTMLTableRowElement):void{
        //
        //For each subject...
         for(const{name} of this.subjects!){
            //
             //Create a cell with 3 columns and the given name
            this.create_element('th', tr, {colSpan:3, textContent:name});
         }
    }
    
    //Created the empty table matrix based on the columns of the header row and 
    //throws in the table's body
    create_empty_body():void{
        //
        //For each body row...
        for(let row=0; row<this.body!.length; row++){
            //
            //Create a new row
            const tr = this.table!.tBodies[0].insertRow();
            //
            //For each header column...
            for(let col=0; col<this.header!.cells.length; col++ ){
                //
                //The first column is a row header cell, th
                if (col===0) this.create_element('th', tr);
                //
                //The rest are normal (td) cells
                else this.create_element('td', tr);
            }
        }
    }
    
    //Show the header row that determines the horizontal dimension of the table
    show_score_row():void{
        //
        //Create the score type row
        this.header = this.table!.tHead!.insertRow(); 
        //
        //Show the student header
        this.create_element('th', this.header, {id:'student', textContent:'Student'});
        //
        //Show as many columns as the product of subjects and score types
        this.show_score_cells();
        //
        //Show the total header
        this.create_element('th', this.header, {id:'total', textContent:'Total'});
        //
        //Show the rank header
        this.create_element('th', this.header, {id:'ranking', textContent:'Rank'});
    }
    
    //Construct and display the cells in the score row, the 3rd row of our table
    show_score_cells(){
        //
        //For each subject....
        for(const subject of this.subjects!){
            //
            //For each score type...
            for (const name of ['value', 'percent', 'grade']){
                //
                //Formulate the id of the cell
                const id = `${subject.id}_${name}`;
                //
                //Create a header cell, with the given name and id 
                this.create_element('th', this.header, {id:id, textContent:name});
            }
        }
    }
    
    //Fill the empty table with the available data for table's body
    fill_body(){
        //
        //For each body row...
        for(let row=0; row<this.body!.length; row++){
            //
            //Get the referenced table body row
            const tr = this.table!.tBodies[0].rows[row];
            //
            //Destructure the body row
            const {student, raw_values, total, ranking} = this.body![row];
            //
            //Set the student cell
            this.set_cell('student', student, tr);
            //
            //Set the cells for score type names
            this.set_score_cells(raw_values, tr);
            //
            //Set the total cell
            this.set_cell('total', total, tr);
            //
            //Set the ranking cell
            this.set_cell('ranking', ranking, tr);
        }
    }
    
    //Lookup the identified header cell and set it the matching body cell
    //to the given value
    set_cell(id:string, value:lib.basic_value, tr:HTMLTableRowElement):void{
        //
        //Get the identified cell
        const th = this.get_element(id) as HTMLTableCellElement;
        //
        //Get the matching cell from the body row
        const td = tr.cells[th.cellIndex];
        //
        //Set the body cell to the given value
        td.textContent = String(value); 
    }
    
    //Set the body cells that are part of the score values
    set_score_cells(raw_values:string, tr:HTMLTableRowElement):void{
        //
        //Convert the string to an array of subject values
        const subjects:Array<{subject:string, value:number, percent:number, grade:string}>
            = JSON.parse(raw_values);
       //
       //For each subject....
       for(const subject of subjects){
           //
           //For each named score type
           for(const name of  ['value', 'percent', 'grade'] as Array<keyof typeof subject>){
               //
               //Formulate the cell id
               const id = `${subject.subject}_${name}`;
               //
               //Set the identified ccell
               this.set_cell(id, subject[name], tr);
           }
       }               
    }
       
};