/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
//GLOBAL VARS
var s_city = 0;
var s_station = 0;
var s_pump = 0;

var pictureSource; // picture source
var destinationType; // sets the format of returned value
var user_id;
var name;
var total_pics = 0;
var j =0 ;



var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');





        // function onSuccess(imageURI) {
        //     var image = document.getElementById('myImage');
        //     image.src = imageURI;
        // }

        // function onFail(message) {
        //     alert('Failed because: ' + message);
        // }


        // $(document).ajaxStart(function() {
        //     $.mobile.loading('show');
        // });

        // $(document).ajaxStop(function() {
        //     $.mobile.loading('hide');
        // });







    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


$(document).on("pagecontainershow", function() {
    ScaleContentToDevice();

    $(window).on("resize orientationchange", function() {
        ScaleContentToDevice();
    })
});

function ScaleContentToDevice() {
    scroll(0, 0);
    var content = $.mobile.getScreenHeight() - $(".ui-header").outerHeight() - $(".ui-footer").outerHeight() - $(".ui-content").outerHeight() + $(".ui-content").height();
    $(".ui-content").height(content-80);
}

function changePage() {


    //LOGIN VALIDATION

    /*$.ajax({
        url: 'http://www.ciancorp.com/primax/services/login.php',
        type: "post",
        cache: false,
        data: {
            "user": $('#txt_cedula').val()
        },
        //dataType: "json",
        success: function(response) {

            if (response.status > 0) {
                var hora = hh_mm();
                var fecha = yyyy_mm_dd();
                $('.time-container').html(hora);
                $('.fecha-text').html(fecha);
                name = response.nombre;
                user_id = response.status;

                grupo = response.grupo_name;
                $('.username span').html($('#txt_cedula').val());
                $('.group span').html(grupo);


                $.mobile.changePage("#page2", {
                    transition: "slide"
                });
            } else {
                navigator.notification.alert("Error al hacer login.", function() {
                    null
                }, "ERROR", "OK");
            }

        },
        beforeSend: function() {
            $.mobile.loading('show');
        },
        complete: function() {
            $.mobile.loading('hide');
        }, //Hide spinner
        error: function(error) {
            $.mobile.loading('hide');
            navigator.notification.alert("Error en la conexion.", function() {
                null
            }, "ERROR", "OK");

        }
    });*/

    $.ajax({
        url: 'http://www.ciancorp.com/primax/services/login.php',
        type: "post",
        cache: false,
        data: {
            "user": $('#txt_cedula').val()
        },
        //dataType: "json",
        success: function(response) {

            if (response!='null') {
                var hora = hh_mm();
                var fecha = yyyy_mm_dd();
                $('.time-container').html(hora);
                $('.fecha-text').html(fecha);
                name = response.user_name;
                user_id = response.user_id;
                city_id = response.city_id;
                city_name = response.city_name;
                group_id = response.grupo_id;
                group_name = response.grupo_name;
                station1_id = response.estacion1_id;
                station1_name = response.estacion1_name;
                station2_id = response.estacion2_id;
                station2_name = response.estacion2_name;
                $('.username span').html($('#txt_cedula').val());

                //carga ciudades
                $('#listaCities').append('<li class="list-item-lnk" data-id="'+city_id+'"> <a href="#"> '+city_name+'</a></li>');
                //$('#listaCities')

                $('.lv-stations').append('<li class="list-item-lnk" data-id="' + station1_id + '"><a href="#">' + station1_name + '</a></li>');
                $('.lv-stations').append('<li class="list-item-lnk" data-id="' + station2_id + '"><a href="#">' + station2_name + '</a></li>');
                $('#lv-stations').listview("refresh");

                $('.username span').html($('#txt_cedula').val());
                $('.group span').html(group_name);

                $.mobile.changePage("#page2", {
                    transition: "slide"
                });
            } else {
                navigator.notification.alert("Error al hacer login.", function() {
                    null
                }, "ERROR", "OK");
            }

        },
        beforeSend: function() {
            $.mobile.loading('show');
        },
        complete: function() {
            $.mobile.loading('hide');
        }, //Hide spinner
        error: function(error) {
            $.mobile.loading('hide');
            navigator.notification.alert("Error en la conexion.", function() {
                null
            }, "ERROR", "OK");

        }
    });
}


function goHome() {
    if(goHomeButtonEnabled){
    var hora = hh_mm();
    var fecha = yyyy_mm_dd();
    $('.time-container').html(hora);
    $('.fecha-text').html(fecha);
    //name = response.nombre;
    //user_id = response.status;
    //$('.username').html(response.nombre);

    $.mobile.changePage("#page2", {
        transition: "slide"
    });
  }
}

function gotoCity() {
    $('#cities-screen .list-item-lnk').click(function() {
        //$.mobile.changePage("#station-screen");
        s_city = $(this).attr('data-id');
        gotoStation();

        //$('#cities-screen .list-item-lnk').unbind("click");
        
    });
    $.mobile.changePage("#cities-screen", {
        transition: "slide"
    });
}

function gotoStation() {
    // $('#station-screen .list-item-lnk').click(function() {
    //     alert($(this).attr('data-id'));
    //     s_station = $(this).attr('data-id');
    //     gotoIsland();
    // });
    $.mobile.changePage("#station-screen", {
        transition: "slide"
    });
}

function gotoIsland() {
    $('#islands-screen .list-item-lnk').click(function() {
        s_pump = $(this).attr('data-id');

        $.mobile.changePage("#questions-screen", {
            transition: "slide"
        });
        //$('#islands-screen .list-item-lnk').unbind("click");
        
    });
    $.mobile.changePage("#islands-screen", {
        transition: "slide"
    });
}







function hh_mm() {
    now = new Date();
    hour = "" + now.getHours();
    if (hour.length == 1) {
        hour = "0" + hour;
    }
    minute = "" + now.getMinutes();
    if (minute.length == 1) {
        minute = "0" + minute;
    }

    return hour + ":" + minute;
}

function yyyy_mm_dd() {
    now = new Date();
    year = "" + now.getFullYear();
    month = "" + (now.getMonth() + 1);
    if (month.length == 1) {
        month = "0" + month;
    }
    day = "" + now.getDate();
    if (day.length == 1) {
        day = "0" + day;
    }

    return day + "/" + month + "/" + year;
    //return year + "/" + month + "/" + day ;
}


function onPhotoDataSuccess(imageData) {
    // Uncomment to view the base64-encoded image data
    // console.log(imageData);

    // Get image handle
    //
    //var smallImage = document.getElementById('smallImage');

    // Unhide image elements
    //
    //smallImage.style.display = 'block';

    // Show the captured photo
    // The in-line CSS rules are used to resize the image
    //
    //smallImage.src = "data:image/jpeg;base64," + imageData;

    //smallImage.src = imageData;


    $('.img-holder').append('<img class="pic_'+total_pics+'" src="'+imageData+'" />');
    total_pics++;
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
    // Uncomment to view the image file URI
    // console.log(imageURI);

    // Get image handle
    //
    var largeImage = document.getElementById('largeImage');

    // Unhide image elements
    //
    largeImage.style.display = 'block';

    // Show the captured photo
    // The in-line CSS rules are used to resize the image
    //
    largeImage.src = imageURI;
}

// A button will call this function
//
function capturePhoto() {
    //alert(2);
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI
            //destinationType: destinationType.DATA_URL
    });
}

// A button will call this function
//
function capturePhotoEdit() {
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 50,
        allowEdit: true,
        destinationType: destinationType.FILE_URI
    });
}

// A button will call this function
//
function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
}

// Called if something bad happens.
//
function onFail(message) {
    //alert('Failed because: ' + message);
    null;
}


$(document).on("pagebeforeshow", "#questions-screen", function() {
    total_pics = 0;

    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
    $('.img-holder').html('');

    var btn_cam = document.getElementById('btn-camera');
    btn_cam.addEventListener('touchstart', function(e) {
        //alert(1);
        capturePhoto();
        //getPhoto();
        e.preventDefault()
    }, false);

    setTimeout(function(){
      sendButtonEnabled=true;
    },2000);

    $('#btn-send-form').click(function() {
      if(sendButtonEnabled){
        uploadPhoto();
      }
      $('#btn-send-form').unbind("click");
    });

});

var sendButtonEnabled=true;
var goHomeButtonEnabled=true;

function uploadPhoto() {


    if ((typeof $('input[name=question1]:checked').val() === 'undefined') || (typeof $('input[name=question2]:checked').val() === 'undefined') || (typeof $('input[name=question3]:checked').val() === 'undefined') || (typeof $('input[name=question4]:checked').val() === 'undefined') || (typeof $('input[name=question5]:checked').val() === 'undefined') || (typeof $('input[name=question6]:checked').val() === 'undefined') || (typeof $('input[name=question7]:checked').val() === 'undefined')) {

        //alert('Es necesario llenar todos los campos.');
        navigator.notification.alert("Es necesario llenar todos los campos.", function() {
            null
        }, "ERROR", "OK");
        sendButtonEnabled=true;

        return;
    } else {

      sendButtonEnabled=false;
      //goHomeButtonEnabled=false;
      $.mobile.loading('show');

    var data = {
        user: user_id,
        ciudad: s_city,
        station: s_station,
        isla: s_pump,
        saludo: $('input[name=question1]:checked').val(),
        uniforme: $('input[name=question2]:checked').val(),
        uniforme_comment: $('#txt-missing').val(),
        aspecto: $('input[name=question3]:checked').val(),
        promo_vigente: $('input[name=question4]:checked').val(),
        marcador_cero: $('input[name=question5]:checked').val(),
        servicios_adicionale: $('input[name=question6]:checked').val(),
        tachos: $('#chk_adicionales_basura').prop('checked'),
        limpieza_parabrisa: $('#chk_adicionales_parabrisa').prop('checked'),
        lubricantes: $('#chk_adicionales_lubricantes').prop('checked'),
        factura: $('input[name=question7]:checked').val(),
        comunicacion_monolito: $('#checkbox-h-6a').prop('checked'),
        comunicacion_banner: $('#checkbox-h-6b').prop('checked'),
        comunicacion_afiche: $('#checkbox-h-6c').prop('checked'),


        comunicacion_lona: $('#checkbox-h-6d').prop('checked'),
        comunicacion_cajau: $('#checkbox-h-6e').prop('checked'),


        estado_monolito: $('input[name=r_monolito]:checked').val(),
        estado_banner: $('input[name=r_banner]:checked').val(),
        estado_afiche: $('input[name=r_afiche]:checked').val(),
        estado_lona: $('input[name=radio_canopy]:checked').val(),
        estado_volantes: $('input[name=radio_volantes]:checked').val(),
        limpia: $('input[name=clean]:checked').val(),
        elementos_danados: $('input[name=damage]:checked').val(),
        elementos_danados_cuales: $('#txt-which').val(),
        despidio: $('input[name=bye]:checked').val(),
        banos_limpieza: $('input[name=radio_limpieza]:checked').val(),
        banos_otros: $('input[name=radio_elementos]:checked').val(),
        implementos_papel: $('#checkbox-h-6a2-papel').prop('checked'),
        implementos_jabon: $('#checkbox-h-6b2-jabon').prop('checked'),




        implementos_gel: $('#checkbox-h-6b2-gel').prop('checked'),
        implementos_toalla: $('#checkbox-h-6b2-toalla').prop('checked'),
        observaciones: $('#txt-observations').val(),


        image: 'false',
    };


        $.ajax({
            url: 'http://www.ciancorp.com/primax/services/saveRecord.php',
            type: "post",
            cache: false,
            data: data,
            //dataType: "json",
            success: function(response) {
               //alert("response"+response.status);
              //  setTimeout(function(){
                //  goHomeButtonEnabled=true;
              //  },3000);
                $.mobile.loading('hide');
                //alert(JSON.stringify(response));

                j = 0;
                if(total_pics > 0) {
                while(j <= total_pics) {

                     //$('.img-holder img').each(function() {
                             //alert($(this).attr('src'));
                             fileUpload($('.pic_'+j).attr('src'),response.status);
                     //});
                     j++;

                }
                 } else {
                   setTimeout(function(){
                     sendButtonEnabled=true;
                   },4000);
                    win();
                 }
              //  win();
            },
            beforeSend: function() {
                //$.mobile.loading('show');
            },
            complete: function() {
                $.mobile.loading('hide');
                /*sendButtonEnabled=true;
                setTimeout(function(){
                  goHomeButtonEnabled=true;
                },3000);*/
            }, //Hide spinner
            error: function(error) {
              setTimeout(function(){
                //goHomeButtonEnabled=true;
              },3000);
                $.mobile.loading('hide');
                sendButtonEnabled=true;
                navigator.notification.alert("Error en la conexion.", function() {
                    null
                }, "ERROR", "OK");

            }
        });
}


}



/********** UPLOAD FILE **************/


function fileUpload(fileUrl, record_id) {
        //alert(record_id);
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName=fileUrl.substr(fileUrl.lastIndexOf('/')+1);
        options.mimeType = "image/jpeg";

        options.chunkedMode = false;

        options.headers = {
            Connection: "close"
        }

        //alert(JSON.stringify(data));
        options.params = {
            'record_id': record_id
        };
        //alert(JSON.stringify(options.params));

        var uri = encodeURI("http://ciancorp.com/primax/services/saveData.php");
        $.mobile.loading('show');
        var ft = new FileTransfer();
        ft.upload(fileUrl, uri, win, fail, options);
}





///////////////////////////////////////////////////


function fail(error) {
    //alert("An error has occurred: Code = " + error.code);
    //alert("upload error source " + error.source);
    //alert("upload error target " + error.target);
//alert(JSON.stringify(e));
    $.mobile.loading('hide');
    //alert(JSON.stringify(e));
    navigator.notification.alert("No se pudo realizar la transacción. :" + e, function() {
        null
    }, "ERROR", "OK");
    //alert('ERROR: No se pudo realizar la transacción.');


}

function win(e) {
//alert(JSON.stringify(e));
//alert('2');
//alert('w');
    $.mobile.loading('hide');

    $('#form_questions')[0].reset();
    //$('#smallImage').attr('src','');
    goHomeButtonEnabled=false;
    setTimeout(function(){
      goHomeButtonEnabled=true;
    },4000);

    $.mobile.changePage("#thanks-screen",{transition:"slide"});
}


// $(document).on("pagebeforeshow", "#thanks-screen", function() {

// document.addEventListener("backbutton", function(e){
//     alert($(".ui-page-active").attr("id"));
//     alert($.mobile.pageContainer.pagecontainer( 'getActivePage' ).attr( 'id' ));

//     if($(".ui-page-active").attr("id") == 'thanks-screen' ){
//         e.preventDefault();
//     }
// }, false);

// });
$(document).on("pagebeforeshow", "#thanks-screen", function() {
    //alert("Gracias Agente!");
});

$(document).on("pagebeforeshow", "#station-screen", function() {

    //alert(2);
    $.mobile.loading('show');
    $('.lv-stations').html('');
    $.post("http://www.ciancorp.com/primax/services/getStations.php", {
            'city': s_city
        })
        .done(function(submitResponse) {
            $.mobile.loading('hide');
            $.each(submitResponse, function(i, item) {
                $('.lv-stations').append('<li class="list-item-lnk" data-id="' + item.id_station + '"><a href="#">' + item.name + '</a></li>').listview("refresh");
            }).complete(function() {
                $('#lv-stations').listview("refresh");
            });;

        });


    $('#station-screen ').on("click", ".list-item-lnk", function() {

        s_station = $(this).attr('data-id');
        //alert("llenar las preguntas"+s_station);
        gotoIsland();

        $('#station-screen ').unbind("click");
        setTimeout(function(){
            $('#station-screen ').bind("click");
        },5000);
    });


});
