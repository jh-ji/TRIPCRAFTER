
const express = require('express');

const Schedule=require('../models/schedule');
const router = express.Router();

router.route('/scheduleDetail')
    
    .get(async (req, res, next) => {
    try {
      const schedules = await Schedule.findAll();
      res.header("Access-Control-Allow-Origin", "*"); //CORS문제 해결
      res.json(schedules);  //제일 마지막 행만 반환
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      res.header("Access-Control-Allow-Origin", "*"); // CORS 문제 해결
      //console.log(req);
      const schedules = await Schedule.create({
        scheduleId: req.body.scheduleId,
        date:req.body.date,
        startTime:req.body.startTime,
        endTime:req.body.endTime,
        placeName:req.body.placeName,
        address:req.body.address,
        phoneNumber:req.body.phoneNumber
    });
      res.header("Access-Control-Allow-Origin", "*"); // CORS 문제 해결
      res.json(schedules);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

  router.get('/:scheduleId', async (req, res, next) => {
    try {
      const scheduleId = req.params.scheduleId;
      const schedules = await Schedule.findAll({
        where: { scheduleId }
      });
      if (schedules.length > 0) {
        res.header("Access-Control-Allow-Origin", "*"); // CORS 문제 해결
        res.json(schedules);
      } else {
        res.status(404).json({ message: 'not found' });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  });
  router.delete('/', async (req, res, next) => {
    try {
      const scheduleId = req.body.scheduleId;
      const placeName=req.body.placeName;
      const result = await Schedule.destroy({
        where: { scheduleId, placeName }
      });
  
      if (result > 0) {
        res.header("Access-Control-Allow-Origin", "*"); // CORS 문제 해결
        res.json({ message: 'Schedule deleted successfully' });
      } else {
        res.status(404).json({ message: 'Schedule not found' });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  });
 
  
  
  
  
  
  
  
  

  

module.exports = router;
