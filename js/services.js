app.factory('sgt_factory', function($http, $q, $log) {
  
  var self = this;
  
  self.baseUrl = 'http://s-apis.learningfuze.com/sgt/';
  
  self.apiKey = '6CVAIe2j0o';
  
  self.Student_cache  = [];
  
  self.httpRequest = function (url, data) {
    
    return $http({
      url: url,
      data: $.param(data),
      method: 'POST',
      dataType: 'json',
      cache: false
    });
  };
  
  /***************************************************************
   getData - see getStudDataCtrl controller
   ***************************************************************/
  
  self.getData = function () {
    var url = self.baseUrl + 'get';
    var sendData = {'api_key': self.apiKey};
    var defer = $q.defer();
    
    self.httpRequest(url, sendData).then(function (resp) {
      // $log.log("data received", resp);
      self.Student_cache = resp.data.data;
      defer.resolve(resp.data.data);
    }, function (err) {
      $log.warn('Error:', err);
      defer.reject(err);
    });
    return defer.promise; //return the promise
  }; //end getData function
  
  /***************************************************************
   addData - see addStudDataCtrl controller
   ***************************************************************/
  
  self.addData = function (student_object) {
    var url = self.baseUrl + 'create';
    var sendData = {'api_key': self.apiKey,
      'name': student_object.name,
      'course': student_object.course,
      'grade': student_object.grade
    };
    var defer = $q.defer();
    
    self.httpRequest(url, sendData, student_object)
      .then(function (resp) {
        // $log.log("data received", resp);
        self.Student_cache.push({ 'id': resp.data.new_id,
          'name': student_object.name,
          'course': student_object.course,
          'grade' : parseInt(student_object.grade)
        });
        defer.resolve(resp);
      }, function (err) {
        $log.warn('Error:', err);
        defer.reject(err);
      });
    return defer.promise; //return the promise
  }; //end addData function
  
  /***************************************************************
   removeData - see removeStudDataCtrl controller
   ***************************************************************/
  
  this.removeData = function(index){
    var url = self.baseUrl + 'delete';
    var sendData = {
      'api_key': self.apiKey,
      'student_id': self.Student_cache[index].id
    };
    var defer = $q.defer();
    
    self.httpRequest(url, sendData)
      .then(function(resp, index){
          if (resp.data.success === true){
            self.Student_cache.splice(sendData.student_id,1);
            self.getData();
          }else{
            defer.resolve(resp);
          }
        // $log.log(resp);
        },function(err){
          defer.reject(err);
        }
      )
    
  };
  
  //return Factory
  return self;
}); //End Factory