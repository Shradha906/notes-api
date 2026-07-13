const pool = require("../config/db");
exports.getNotes = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM notes ORDER BY id");

        res.json(result.rows);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};
exports.addNote = async (req, res) => {

    try {

        const { title } = req.body;

        const result = await pool.query(
            "INSERT INTO notes(title) VALUES($1) RETURNING *",
            [title]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

};
exports.updateNote = async (req, res) => {
    try {
        const id = req.params.id;
        const { title } = req.body;

        const result = await pool.query(
            "UPDATE notes SET title = $1 WHERE id = $2 RETURNING *",
            [title, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Note Not Found"
            });
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

exports.deleteNote = async (req, res) => {

    try {

        const id = req.params.id;

        const result = await pool.query(
            "DELETE FROM notes WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Note Not Found"
            });
        }

        res.json({
            message: "Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

};