export class Product {
    constructor(
        public id:number,
        public client_id:string,
        public nickname:string,
        public title:string,
        public description:string,
        public location:string,
        public image:string,
        public category:string,
        public telephone:string
    ) {}
}