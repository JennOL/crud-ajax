import performer from '/lib/request.js'

export class Todo {
   static async all(){
    let todos = await performer({type: 'listall'});
    return todos.map(todoJSON => new Todo(todoJSON));
   }

   constructor(args){
    this.userId = args.userId;
    this.title = args.title;
    this.completed = args.completed;
    this.id = args.id;
   }

   async save(){
      if(this.id)
         this.update();
   
      this.create();
   }

   async create(){
      let response = await performer({
         type: 'create',
         payload: {
            userId: this.userId && 0,
            title: this.title,
            completed: false
         }
      });
   }

   async update(){
      let response = await performer({
         type: 'update', 
         payload: {
            title: this.title
         }
      });

    return response;
   }

   async destroy(){
      let response = await performer({
         type: 'destroy',
         payload: {
            id: this.id
         }
      });

      return response;
   }
}