"use strict"

import { Tree } from "./model/model.js";
window.addEventListener("DOMContentLoaded",start);
let Qtree;
function start(){
    console.log("JS started");
    Qtree=new Tree();
    Qtree.addNode("Is it a mammal?");//root
    Qtree.addNode("Is it a rabbit?");//yes
    Qtree.addNode("Is it a bird?");//no
    Qtree.insertNode("Is it a parrot?",Qtree.getNode(3));//yes
    const nodes=Qtree.nodesToArray();
    //let node=Qtree.getRoot();
    currentNode=nodes[0];
    console.log(nodes[2])
   
   // showCurrentNode(currentNode);
    registerButtonClicks();
  
}
let currentNode;
//Qtree.addNode("Is it a mammal?");

function showCurrentNode(node){
  
   if(!node){
         return;
   }
   const nodes=document.querySelectorAll("#current-node .node");
   for(let node of nodes){
       node.classList.add("hide");
   }
  const current=node;
    console.log("show current: ",current)
   console.log(isLeaf(current))
//    if(isLeaf(current)){
//     current.yes.id=-1;
//     current.no.id=-2;
//    }
if(isLeaf(current)){
    let currentNodediv=document.createElement("div");
    currentNodediv.innerHTML=`<div>${node.question} </div>
    <button id="-1" class="yes">Yes</button>
        <button id="-2" class="no">No</button>`;
        currentNodediv.classList.add("node")
   
    
    document.querySelector("#current-node").appendChild(currentNodediv);
   
   
}else if(!current.no){
    let currentNodediv=document.createElement("div");
    currentNodediv.innerHTML=`<div>${node.question} </div>
        <button id="${current.yes.id}" class="yes">Yes</button>
        <button id="-2" class="no">No</button>`;
        currentNodediv.classList.add("node")
   
    
    document.querySelector("#current-node").appendChild(currentNodediv);
}else{
let currentNodediv=document.createElement("div");
currentNodediv.innerHTML=`<div>${node.question} </div>
    <button id="${current.yes.id}" class="yes">Yes</button>
        <button id="${current.no.id} "class="no">No</button>`;
        currentNodediv.classList.add("node")
   
    document.querySelector("#current-node").appendChild(currentNodediv);
}
}
function registerButtonClicks(){
    document.querySelector("main").addEventListener("click",userClicked);
    function userClicked(event){
        const target=event.target;
        console.log(target);
        if(target.tagName==="BUTTON"){
            buttonClicked(target);
            console.log("userClicked",target.id)
        }
    }
}
function buttonClicked(button){
    console.log("buttonClicked",button.id);
    const index=Number(button.id);
    console.log("index : ", index);
if(index<0){
    switch (index){
        case -1:
            showWinMessage();
            break;
        case -2:
            getUserReponse(currentNode);
            break;
        default:
            console.error("buttonClicked: unknown button id",button.id);
    
    }
}
    const newNode=Qtree.getNode(index);
    console.log("new node: ",Qtree.getNode(button.id))
    let choice=button.className;
   console.log(choice)
   currentNode=newNode;

    if(choice==="yes"  ){
        
        console.log(button)
       
        showCurrentNode(newNode);
       if(!newNode){
            showWinMessage();
       }
    }
    else if(choice==="no"){
        console.log("no");
       
        showCurrentNode(newNode);
        
       if(!newNode){
            getUserReponse(currentNode);
       }
    }
    else if(button.id==="export"){
        console.log("export");
        
        saveTreeAsJson(Qtree,"tree.json");
    }
    else if(button.id==="start"){
     runLoop();
     document.querySelector("#start").classList.add("hide");
    }
    else{
        console.error("buttonClicked: unknown button id",button.id);
    }
}
function runLoop(){
    const nodes=Qtree.nodesToArray();
    //let node=Qtree.getRoot();
    currentNode=nodes[0];
        showCurrentNode(currentNode)
        
}
function getUserReponse(node){
    currentNode=node;
    const userResponsDiv=document.querySelector("#user-response");
    userResponsDiv.classList.remove("hide");
    userResponsDiv.addEventListener("click",(event,currentNode)=>{
        event.preventDefault();
        const answer="Is it a "+document.querySelector("#answer").value;
        const newQuestion=document.querySelector("#question").value;
      console.log(answer," : ",newQuestion);
      Qtree.updateTree(newQuestion,answer,currentNode);
    //   const qNode=Qtree.insertNode(newQuestion,node);
    //   const aNode=Qtree
        // const newNodes=updateTree(answer,newQuestion);
        // Qtree=newNodes.answer;
        // currentNode=newNodes.newQuestion;
        // showCurrentNode(currentNode);
        userResponsDiv.classList.add("hide");
        document.querySelector("#start").classList.remove("hide");

    })
 
    
}
// a function to save and export the Tree as an JSON file?
function saveTreeAsJson(tree, filename) {
    // Convert the tree to a JSON string
    const jsonString = convertTree(tree.getRoot())
  
    // Create a blob with the JSON data
    const blob = new Blob([jsonString], { type: 'application/json' });
  
    // Create a link to download the file
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  
    // Clean up
    URL.revokeObjectURL(link.href);
  }
  function convertTree(node){
    const serializedNodes = [];

    function serialize(node) {
        const serializedNode = {
            id: node.id,
            question: node.question,
            // Only serialize the ID of the parent node to avoid circular references
            parent: node.parent ? node.parent.id : null,
            // Recursively serialize 'yes' and 'no' child nodes
            yes: node.yes ? serialize(node.yes) : null,
            no: node.no ? serialize(node.no) : null
        };
        serializedNodes.push(serializedNode);
        return serializedNode;
    }

    // Serialize the tree starting from the root node
    serialize(node);

    // Return the serialized tree
    return JSON.stringify(serializedNodes,null,3);
}
  
  function isLeaf(node){
  if(node){
    if(node.yes==null && node.no==null){
        return true;
    }
    else{
        return false;
    }
}
  }
    function showWinMessage(){
        const statusdiv=document.querySelector("#status")
        statusdiv.innerHTML="I guessed it!";
        document.querySelector("#current-node").classList.add("hide")
    }
  

  
