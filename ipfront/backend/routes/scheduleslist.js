
const express = require('express');

const Schedulelist=require('../models/schedulelist');
const { Schedule } = require('../models');
const router = express.Router();
router.route('/:scheduleId')
.delete(async (req, res, next) => {
  try {
    res.header("Access-Control-Allow-Origin", "*"); // CORS 문제 해결
    const  scheduleId  = req.params.scheduleId; // 요청 본문에서 tel 값 추출
    
    const result = await Schedulelist.destroy({
      where: { scheduleId: scheduleId }
    });

    if (result) {
      res.header("Access-Control-Allow-Origin", "*"); // CORS 문제 해결
      res.json({ message: `${scheduleId} 값을 가진 행이 삭제되었습니다.` });
    } else {
      res.header("Access-Control-Allow-Origin", "*"); // CORS 문제 해결
      res.status(404).json({ message: "해당 scheduleid 값을 가진 행을 찾을 수 없습니다." });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
})
router.route('/')

  .post(async (req, res, next) => {
    try {
      //console.log(req);
      const schedules = await Schedulelist.create({
        scheduleName:req.body.scheduleName,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        member1Tel:req.body.member1Tel,
          member1Name:req.body.member1Name,
          member2Tel:req.body.member2Tel,
          member2Name:req.body.member2Name,
          member3Tel:req.body.member3Tel,
          member3Name:req.body.member3Name,
          member4Tel:req.body.member4Tel,
          member4Name:req.body.member4Name
    });
    
      res.status(200).json(schedules);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

  const { Op } = require('sequelize');

router.get('/:tel', async (req, res, next) => {
    try {
      res.header("Access-Control-Allow-Origin", "*"); // CORS 문제 해결
        const tel = req.params.tel;
        const schedules = await Schedulelist.findAll({
            where: {
                [Op.or]: [
                    { member1tel: tel },
                    { member2tel: tel },
                    { member3tel: tel },
                    { member4tel: tel }
                ]
            }
        });
        if (schedules.length > 0) {
            res.header("Access-Control-Allow-Origin", "*"); // CORS 문제 해결
            res.json(schedules);
        } else {
            //res.status(404).json({ message: 'not found' });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});
  
  
 
  
  
  
  
  
  
  
  

  

module.exports = router;
