/********************* getData Controller *********************/
app.controller('getStudDataCtrl', function($log, sgt_factory){
  
  var thisGetCtrl = this;
  thisGetCtrl.studentArr = [];
  
  thisGetCtrl.obtainData = function(){
    sgt_factory.getData().then(function(data){
      // $log.info('Obtained data in controller: ', data);
      thisGetCtrl.studentArr = data;
    }, function(err){
      // $log.warn('This is the error in the controller');
    })
  };
  
  thisGetCtrl.obtainData(); //this is how you get around document.ready in angular - you call your method
});

/********************* addData Controller *********************/
app.controller('addStudDataCtrl', function($log, sgt_factory) {
  
  var thisAddCtrl = this;
  
  thisAddCtrl.student = {
    'name' : "",
    'course' : "",
    'grade': ""
  };
  
  thisAddCtrl.additionalStudent = function () {
    sgt_factory.addData(thisAddCtrl.student).then(function (resp) {
      // $log.log("This is the log for adding students", resp);
      thisAddCtrl.clearStudentForm();
    }, function (err) {
      // $log.log("Error: ", err);
    });
  };
  
  thisAddCtrl.clearStudentForm = function (){
    thisAddCtrl.student = {};
  }
});

/********************* removeStudentData Controller *********************/
app.controller('removeStudDataCtrl', function(sgt_factory){
  
  thisRemoveCtrl = this;
  
  thisRemoveCtrl.catchData = function(index) {
    
    sgt_factory.removeData(index);
  }
});

/********************* displayData Controller *********************/
app.controller('displayDataCtrl', function($log, sgt_factory){
  
  this.displayStudents = function (){
    return sgt_factory.Student_cache;
  }
});

/********************* Grade Average Controller *********************/
app.controller("gradeAveDataCtrl",function(sgt_factory, $log){
  
  this.getGradeAverageData = function() {
    var total_students = 0;
    var total_grades = 0;
    
    if (sgt_factory.Student_cache.length === 0) {
      return 0;
    }else {
      for (var i = 0; i < sgt_factory.Student_cache.length; i++) {
        total_students = sgt_factory.Student_cache.length;
        total_grades = total_grades + sgt_factory.Student_cache[i].grade;
      }
    }
    
    // $log.log(total_grades + " " + total_students);
    return (total_grades/total_students).toFixed(2) + '%';
  };
});
