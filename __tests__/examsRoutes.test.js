const examsController = require('../controllers/examsController');

test('Exams page is rendering.', () => {
    const req = {};
    const res = { render: jest.fn() };
    examsController.exam_create(req, res);
    expect(res.render.mock.calls[0][0]).toBe('exams/create');
});