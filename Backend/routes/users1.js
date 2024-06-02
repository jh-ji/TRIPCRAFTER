
const express = require('express');
const User = require('../models/user1');
const router = express.Router();
const { Op } = require('sequelize');
router.route('/usercheckin')
    
    .post(async (req, res, next) => {
        try {
          const input_name = req.body.name; //이부분 안되면 파라미터로 받아서 인풋에 저장
          const input_tel = req.body.tel; 
          const users = await User.findOne({
            where: {
              name: input_name,
              tel: input_tel
            }
          }).then(user => {
            if (!user) {
              // 사용자가 존재하지 않는 경우, 새로운 사용자를 생성합니다.
              return User.create({
                name: input_name,
                tel: input_tel
              }).then(() => {
                console.log("Data inserted and page moved");
              });
            } else {
              console.log("Data already inserted and page moved");
            }
          }).catch(err => {
            console.error("Error:", err);
          });
          res.status(200).json(users);
        } catch (err) {
          console.error(err);
          next(err);
        }
      });

router.get('/getfriends/:tel', async (req, res, next) => {
  try {
    res.header("Access-Control-Allow-Origin", "*"); // CORS 문제 해결
      const tel = req.params.tel;
      const groupnameQuery = await User.findOne({
          where: { tel: tel }
      });
      
      if (!groupnameQuery) {
          return res.status(404).json({ message: "해당 tel에 해당하는 데이터를 찾을 수 없습니다." });
      }
      
      const groupname = groupnameQuery.groupname;
      if(!groupname||groupname==""){
        return res.json([]);
      }
      const matchedData = await User.findAll({
          where: { groupname: groupname, tel: { [Op.ne]: tel } },
          attributes: ['tel', 'name']
      });
      
      res.json(matchedData);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "서버 에러" });
  }
});
router.get('/:tel', async (req, res, next) => {
  try {
    const tel = req.params.tel;
    const friend = await User.findOne({
      where: { tel }
    });
    if (friend) {
      res.header("Access-Control-Allow-Origin", "*"); // CORS 문제 해결
      res.json(friend);
    } else {
      const none={name:"없습니다",tel:""}
      res.json(none);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.route('/')
  .post(async (req, res, next) => {
    try {
      console.log(req);
      const users = await User.create({
        name: req.body.name,
        tel:req.body.tel
    });
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

  router.route('/addgroupname/:id')
  .put(async (req, res, next) => {
    try {
      res.header("Access-Control-Allow-Origin", "*"); //CORS문제 해결
      
      const input_groupname = req.param(`id`); // req.params.id를 통해 URL에서 id를 가져옴
      const user = await User.findOne({
        where: {
          tel: req.body.tel
        }
      });

      if (user) {
        // 사용자가 발견되면 groupname 업데이트
        user.groupname = input_groupname;
        await user.save(); // 변경사항 저장

        res.status(200).json({ message: 'groupname이 업데이트되었습니다.', user });
      } else {
        res.status(404).json({ message: '해당 전화번호로 사용자를 찾을 수 없습니다.' });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  });


  router.route('/addgroupmember/')
  .put(async (req, res, next) => {
    try {
      res.header("Access-Control-Allow-Origin", "*"); //CORS문제 해결
      let randomnum=Math.random();
      let changegroupname=String(randomnum);
      const user1 = await User.findOne({
        where: {
          tel: req.body.fromUserTel
        }
      });
      if (user1) {
        // 사용자가 발견되면 groupname 업데이트
        if(user1.groupname==null){
          user1.groupname=changegroupname;
          
        } 
        else{
          changegroupname =user1.groupname;
        }
        await user1.save();
      } else {
        res.status(404).json({ message: '로그인한 유저의 그룹이름을 찾을 수 없습니다.' });
      }
     
      const user = await User.findOne({
        where: {
          tel: req.body.toUserTel
        }
      });

      if (user) {
        // 사용자가 발견되면 groupname 업데이트

        user.groupname = changegroupname;
        await user.save(); // 변경사항 저장

        res.status(200).json({ message: '그룹이름이 같은 그룹 멤버가 추가되었습니다.', user });
      } else {
        res.status(404).json({ message: '그룹 멤버가 추가되지 않았습니다.' });
      }

    } catch (err) {
      console.error(err);
      next(err);
    }
  });



module.exports = router;
