export class Node{
    constructor(){
        this.id=null
        this.parent=null;
        this.question="";
        this.yes=null;
        this.no=null;
    }
}
 export class Tree{
    constructor(){
        this.root=null;
        this.nextId=1
        this.nodes=this.nodesToArray();
    }
    addNode(question){ //should only be used initializing the tree-structure in this game
        let node=new Node();
        node.id=this.nextId++;
        node.question=question;
        if(this.root==null){
            this.root=node;
            
        }
        else{
            let current=this.root;
            while(true){
                if(current.yes==null){
                    current.yes=node;
                    node.parent=current;
                    break;
                }
                else if(current.no==null){
                    current.no=node;
                    node.parent=current;
                    break;
                }
                else{
                    current=current.yes;
                }
            }
        }
    }
    getRoot(){
        return this.root;
    }
    getYes(node){
        return node.yes;
    }
    getNo(node){
        return node.no;
    }
    getParent(node){
        return node.parent;
    }
    getQuestion(node){
        return node.question;
    }
    insertNode(question,currentnode){
        let node=new Node();
        node.id=this.nextId++;
        node.question=question;
       node.parent=currentnode;
       currentnode.yes=node;
    }
    printTree(node=this.root){
       if(node!=null){
              console.log(node.question);
              this.printTree(node.yes);
              this.printTree(node.no);
       } 
       
    }
    getNode(id){
        return this.findNode(this.root,id);
    }
    findNode(node,id){
        if(node==null){
            return null;
        }
        if(node.id==id){
            return node;
        }
        let found=this.findNode(node.yes,id);
        if(found!=null){
            return found;
        }
        return this.findNode(node.no,id);
    }
    nodesToArray(){
        let nodes=[];
        this.nodesToArrayHelper(this.root,nodes);
        return nodes;
    }
    nodesToArrayHelper(node,nodes){
        if(node!=null){
            nodes.push(node);
            this.nodesToArrayHelper(node.yes,nodes);
            this.nodesToArrayHelper(node.no,nodes);
        }
    }
  
   
 }