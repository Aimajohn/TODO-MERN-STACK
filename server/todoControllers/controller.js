import { pool } from "../db.js";

export const getTodos = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM todo ORDER BY created_at DESC");
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({"message":"Error 500 de servidor 😝"})
    }
};
export const getTodo = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM todo WHERE id = ?", [
          req.params.id,
        ]);
        if(result[0].length === 0){
          return res.status(404).json({"message": "Task not found"})
        }
        res.json(result[0]);
    } catch (error) {
        res.status(500).send("Error 500 de servidor 😝")
    }
};
export const putTodo = async (req, res) => {
    try {
        const response = await pool.query("UPDATE todo SET ? WHERE id = ?", [
          req.body,
          req.params.id,
        ]);
        if(response[0].affectedRows === 0){
          return res.status(404).json({"message": "Task not found"})
        }
        res.json(response);
    } catch (error) {
        res.status(500).send("Error 500 de servidor 😝")
    }
};
export const deleteTodo = async(req, res) => {
    try {
        const response = await pool.query("DELETE FROM todo WHERE id = ?", [req.params.id])
        if(response[0].affectedRows === 0){
            return res.status(404).json({"message": "Error 404 task not found"})
        }
      res.json({message: `Task with id ${req.params.id} was eliminated`});
    } catch (error) {
        res.status(500).send("Error 500 de servidor 😝")
    }
};
export const createTodo = async (req, res) => {
    try {
        const { title, description, emoji } = req.body;
        const [result] = await pool.query(
          "INSERT INTO todo(title, description, emoji) VALUES (?, ?, ?)",
          [title, description, emoji]
        );
        res.json({ title, description, emoji, id: result.insertId });
    } catch (error) {
        res.status(500).send("Error 500 de servidor 😝")
    }
};
