var express = require('express');
const { requestAllGoals, request} = require('../db/requests');
var router = express.Router();


// let goals = [{
//   "id": "1",
//   "icon": "📚",
//   "details": "Learn React",
//   "period": "week",
//   "events": 4,
//   "goal": 10,
//   "deadline": "",
//   "completed": 3,
// },
// {
//   "id": "2",
//   "icon": "📚",
//   "details": "Learn Python",
//   "period": "week",
//   "events": 5,
//   "goal": 20,
//   "deadline": "",
//   "completed": 5,
// },
// {
//   "id": "3",
//   "icon": "📚",
//   "details": "Learn JavaScript",
//   "period": "week",
//   "events": 7,
//   "goal": 15,
//   "deadline": "",
//   "completed": 8,
// }];

/* GET goals listing. */
router.get('/', function (req, res, next) {
  requestAllGoals('goals', (err, goals) => {
    if (err) {
      return next(err);
    }
    console.log(goals);
    res.send(goals);
  }); 
});

/*GET goal by ID*/
router.get('/:id', function (req, res, next) {
  const goalId = req.params.id;
  request('goals', goalId, (err, goal) => {
    if (err) {
      return next(err);
    }
    if (!goal.length) {
      return res.status(404).send('Goal not found');
    }
    res.send(goal[0]);
  });
});

/* POST create new goal */
router.post('/', function (req, res, next) {
  const newGoal = req.body;
  goals.push(newGoal);
  res.status(201).send(newGoal);
});

/* PUT update goal by ID */
router.put('/:id', function (req, res, next) {
  const goalId = req.params.id;
  const goal = req.body;
  if (goal.id !== goalId) {
    return res.status(409).send('ID in body does not match ID in URL');
  }
  const goalIndex = goals.findIndex(g => g.id === goalId);
  if (goalIndex === -1) {
    return res.status(404).send('Goal not found');
  }
  goals[goalIndex] = goal;
  res.send(goal);
});

/* DELETE goal by ID */
router.delete('/:id', function (req, res, next) {
  const goalId = req.params.id;
  const goalIndex = goals.findIndex(g => g.id === goalId);
  if (goalIndex === -1) {
    return res.status(404).send('Goal not found');
  }
  goals.splice(goalIndex, 1);
  res.status(204).send();
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('Respond with a resource');
});

module.exports = router;
