import { TodoUser } from "../models/todo.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if ((!title, !description)) {
      return res.status(403).json({
        status: false,
        message: "All field is required",
      });
    }
    await TodoUser.create({
      title,
      description,
    });
    res.status(200).json({
      status: 200,
      message: "Todo created successfully",
      TodoUser, // in this line we are returning todoUser
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Welcome back  ${User.fullName}`,
    });
  }
};

export const TodoGet = async (req, res) => {
  try {
const todo= await TodoUser.find();
console.log("🚀 ~ TodoGet ~ todo:", todo)

return  res.status(200).json({
    Todo : TodoUser.length === 0 ? [] : todo
    
})
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Welcome back  ${User.fullName}`,
    });
  }
};



export const updateTodo = async (req,res) => {
    try {
        const todoId = req.params.TodoId;        // this id is comming from the todo route in routes :todoUser
        const  {title} = req.body;
        console.log("🚀 ~ updateTodo ~ title:", title)
        const todo = await TodoUser.findByIdAndUpdate(todoId,{title},{new:true});
        await todo.save();

        return res.status(200).json({
            success: true,
            todo,
            message: "Todo Updated"
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "user id not found",
          });  
    }
}

export const deleteTodo = async(req,res)=>{
    try {
        const todoId = req.params.TodoId;          // this id is comming from the todo route in routes :todoUser
       const todo = await TodoUser.findByIdAndDelete(todoId);
        return res.status(200).json({
            success: true,
            message: "todo deleted successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Todo Not delete",
          });
        
    }
}
