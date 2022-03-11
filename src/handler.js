const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (req, h) => {
    const { title, tags, body } = req.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };

    notes.push(newNote);
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const res = h.response({
            status: 'success',
            message: 'catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        res.code(201);
        return res;
    }

    const res = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    res.code(500);
    return res;
};

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

const getNoteByIdHandler = (req, h) => {
    const { id } = req.params;

    const note = notes.filter((n) => n.id === id)[0];

    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }

    const res = h.response({
        status: 'fail',
        message: 'catatan tidak ditemukan',
    });
    res.code(404);
    return res;
};

const editNoteByIdHandler = (req, h) => {
    const { id } = req.params;
    const { title, tags, body } = req.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((n) => n.id === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            id,
            updatedAt,
        };

        const res = h.response({
            status: 'success',
            message: 'catatan berhasil di perbaharui',
            data: {
                notes,
            },
        });
        res.code(201);
        return res;
    }

    const res = h.res({
        status: 'fail',
        message: 'catatan tidak dapat diperbaharui',
    });
    res.code(404);
    return res;
};

const deleteNoteByIdHandler = (req, h) => {
    const { id } = req.params;

    const index = notes.findIndex((n) => n.id === id);

    if (index !== -1) {
        notes.splice(index, 1);
        const res = h.response({
            status: 'success',
            message: 'data berhasil dihapus',
        });
        res.code(200);
        return res;
    }

    const res = h.response({
        status: 'fail',
        message: 'data gagal dihapus',
    });
    res.code(404);
    return res;
};

module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler,
};
