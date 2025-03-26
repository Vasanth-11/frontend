import json from "./components/data.json"
import './App.css'
import  {useState} from "react"

const List = ({list, addNodeToList,deleteNodeFromList})=>{
  const [isExpanded, setIsExpanded]= useState({})

  return <div className="container">
    {list.map((node)=>(
      <div key={node.id}>
        {node?.istaskComplete&&(<span onClick={()=>setIsExpanded((prev)=>({
          ...prev,
          [node.name]:!prev[node.name]
        }))

        }>
          {isExpanded?.[node.name]?"-":"+"}</span>)}
        <span>{node.name}</span>
        <span onClick={()=>addNodeToList(node.id)}>
          <img
              src="https://static.vecteezy.com/system/resources/previews/041/503/349/non_2x/add-folder-icon-on-3d-rendering-user-interface-icon-concept-free-png.png"
              alt='icon'
              className="icon"
          />
        </span>
        <span onClick={()=>deleteNodeFromList(node.id)}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE06gVyvyGjKsr5oxvIcR1M8O67eRXUQ2Maw&s" alt="del" className="icon"></img>
        </span>

        

        {isExpanded?.[node.name]&& node?.children &&(
          <List list={node.children} addNodeToList={addNodeToList} deleteNodeFromList={deleteNodeFromList}/>
        )}
      </div>
    ))}
  </div>
}

export default function App(){
  const [data, setData]= (useState(json)) 
 
  const addNodeToList = (parentId)=>{
    const name= prompt("Enter Name")
    const updateTree = ((list)=>{
      return list.map((node)=>{
        if(node.id === parentId){
          return({
            ...node,
            children:[
              ...node.children,
              {id:123,name:name,isFolder:true,children:[]}
            ]
          }          
          )
        }
          if(node.children){
            return({...node,  
            children: updateTree(node.children)
        })}
        return node
      })
    })
    setData((prev)=> updateTree(prev))
  }

  const deleteNodeFromList = (itemId)=>{
    const updateTree =((list)=>{
      return list.filter((node)=>node.id !==itemId)
      .map((node)=>{
        if(node.children){
          return{...node,
            children:updateTree(node.children)
          }
        }
        return node
      })
    })
    setData((prev)=> updateTree(prev))

  }


  return(
    <div className="App">
      <h1>File and Folder explorer</h1>
      <List list={data} addNodeToList={addNodeToList}deleteNodeFromList={deleteNodeFromList}/>
    </div>
  )
} 