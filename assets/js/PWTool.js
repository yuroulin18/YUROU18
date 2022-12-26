// 防止網頁右鍵另存
jQuery(document).ready(function()
{
$(this).bind("contextmenu", function(e) {
        e.preventDefault();
    });
});

var firebaseConfig = {
    apiKey: "AIzaSyDcRVwf3C-_jVdZuVIwU2r1etkFQduMsvA",
    authDomain: "personal-web-1dec5.firebaseapp.com",
    projectId: "personal-web-1dec5",
    storageBucket: "personal-web-1dec5.appspot.com",
    messagingSenderId: "624631437013",
    appId: "1:624631437013:web:ddde1582457eb67e92745c",
    measurementId: "G-SWVL73YY8F"
};

// 資料庫分析&連結
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();

// 個人資料填入(左側) - aboutMe
function getPersonInfo(){
    db.collection("PersonInfo").get().then(function(querySnapshot) {
        var personalInfo = "";
        var contactInfo = "";
        var resumeInfo = "";
        querySnapshot.forEach(function(doc) {
            if (doc.id === "Contact"){
                personalInfo = "<h3 style=\"text-align:center;\"><a>"+doc.data()["CName"]+" "+doc.data()["EName"]+"</a></h3>"+
                               "<p style=\"padding-top:10px;font-size:16px;text-align:justify;\">"+doc.data()["簡介"]+"</p>";
                contactInfo	= "<p>行動電話："+doc.data()["CellPhone"]+"<br />"+
                              "電子信箱：<a href=\"mailto:"+doc.data()["Email"]+"\">"+doc.data()["Email"]+"</a><br />"+
                              "居住地區："+doc.data()["Location"]+"<br /></p>";								   
            }
            else if (doc.id === "Resume"){
                for (var i = doc.data()["版本"].length-1 ; i >= 0 ; i--){
                    resumeInfo += "<div class=\"col-4\"><img class=\"image fit\" src=\"resume/"+doc.data()["版本"][i]+".jpg\" alt=\"\" /></div>"+
                                  "<div class=\"col-8\"><h4>"+doc.data()["版本"][i]+"</h4>"+
                                  "<a href=\"resume/"+doc.data()["版本"][i]+".pdf\" download=\"妤柔 – "+doc.data()["版本"][i]+".pdf\" style=\"font-size:16px;\">點擊下載"+
                                  "<i style=\"padding-left:3px;\" class=\"fa fa-download\"></i></a></div>";
                }
            }
        });	
        document.getElementById("personalInfo").innerHTML=personalInfo;
        document.getElementById("contactInfo").innerHTML=contactInfo;
        document.getElementById("resumeInfo").innerHTML=resumeInfo;
    });
};

// 技能資料填入(右側) - aboutMe
function getSkillInfo(){
    db.collection("Skills").get().then(function(querySnapshot) {
        var skillInfo = "<table>";
        querySnapshot.forEach(function(doc) {
            skillInfo += "<tr><td width=\"35%\" style=\"font-weight:bold;\">"+doc.data()["類別"]+"</td><td>"+doc.data()["項目"]+"</td></tr>";					
        });	
        skillInfo += "</table>";
        document.getElementById("skillInfo").innerHTML=skillInfo;
    });
};

// 證照資料填入(右側) - aboutMe
function getCertificateInfo(){
    db.collection("Certificate").get().then(function(querySnapshot) {
        var certificateInfo = "<table>";
        querySnapshot.forEach(function(doc) {
            certificateInfo += "<tr><td width=\"30%\" style=\"font-weight:bold;\">"+doc.data()["類別"]+"</td><td>"+doc.data()["項目"]+"</td></tr>";					
        });	
        certificateInfo += "</table>";
        document.getElementById("certificateInfo").innerHTML=certificateInfo;
    });
};

// 學歷資料填入(右側) - aboutMe
function getEducationInfo(){
    db.collection("Education").get().then(function(querySnapshot) {
        var educationInfo = "";
        querySnapshot.forEach(function(doc) {
            educationInfo += "<section><header><h3><a href=\""+doc.data()["連結"]+"\">"+doc.data()["校名"]+"</h3>"+doc.data()["校名(英)"]+"</a></header>"+
                             "<p>"+doc.data()["科/系所"]+"｜"+doc.data()["就讀起日"]+" – "+doc.data()["就讀迄日"]+"</p><ul>";
            for (var i = 0 ; i < doc.data()["事蹟"].length ; i++){
                educationInfo += "<li>"+doc.data()["事蹟"][i]+"</li>";
            }
            educationInfo += "</ul></section>";
        });	
        document.getElementById("educationInfo").innerHTML=educationInfo;
    });	
};

// 4個重要待辦事項(下方) - index、aboutMe、Experience
function getPostInfo(){
    db.collection("Post").get().then(function(querySnapshot) {
        var postInfo = "";
        querySnapshot.forEach(function(doc) {
            postInfo += "<li><article class=\"post stub\"><header><h3><a href=\""+doc.data()["相關連結"]+"\">"+doc.data()["事項名稱"]+"</a>"+
                        "</h3></header><span class=\"timestamp\">上次更新 "+doc.data()["上次更新時間"]+"</span></article></li>";
        });	
        document.getElementById("postInfo").innerHTML=postInfo;
    });	
};	

// 技能發展圓餅圖 - aboutMe
function getPieChart(){
    var chart = {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
    };
    var title = {
        text: "北護資管系核心能力指標發展－林妤柔"   
    };      
    var tooltip = {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
    };
    var plotOptions = {
        pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
            enabled: true,
            format: "<b>{point.name}%</b>: {point.percentage:.1f} %",
            style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || "black"
            }
            }
        }
    };
    var series= [{
        type: "pie",
        name: "能力佔比",
        data: [
            ["基礎資訊管理知識", 18.0],
            ["專業管理能力", 12.0],
            {
            name: "軟體開發能力",
            y: 20.0,
            sliced: true,
            selected: true
            },
            ["資訊科技應用能力", 14.0],
            ["健康照護資訊應用能力", 12.0],
            ["獨立思考與創新能力", 10.0],
            ["溝通與表達能力", 10.0],
            ["團隊合作能力", 4.0]
        ]
    }];     
        
    var json = {};   
    json.chart = chart; 
    json.title = title;     
    json.tooltip = tooltip;  
    json.series = series;
    json.plotOptions = plotOptions;
    $("#pieChart").highcharts(json);  
};

// 相簿資料填入 - Album
function getFullInfo(){
    db.collection("Album").get().then(function(querySnapshot) {
        var fullInfo = "<section id=\"thumbnails\">";
        querySnapshot.forEach(function(doc) {
            fullInfo += "<article><a class=\"thumbnail\" href=\"images/fulls/"+doc.data()["照片編號"]+".jpg\">"+
                        "<img src=\"images/thumbs/"+doc.data()["照片編號"]+".jpg\" alt=\"\" /></a><h2>"+doc.data()["照片名稱"]+"</h2>"+
                        "<p>"+doc.data()["照片敘述"]+"</p></article>";            
        });	
        fullInfo += "</section>";
        document.getElementById("fullInfo").innerHTML=fullInfo;
    });	
};

// 取得網址後帶的參數 - Experience
function getWebStyle_E(url){
    var style = "";
    //再來用去尋找網址列中是否有資料傳遞(QueryString)
    if (url.indexOf("?")!=-1){
        //在此直接將各自的參數資料切割放進ary中
        var ary = url.split("?")[1].split("&");        
        //下迴圈去搜尋每個資料參數
        for (i=0;i<=ary.length-1;i++){
            //如果資料名稱為id的話那就把他取出來
            if (ary[i].split("=")[0] == "style"){
                style = ary[i].split("=")[1];
                getExpInfo(style);
            };                
        };       
    };    
};

// Work及School經驗資料填入 - Experience
function getExpInfo(style){
    var expInfo = "";
    db.collection("Experience").where("屬性", "==", style).orderBy("時間戳記", "desc").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            expInfo += "<section><header><h3>"+doc.data()["職位"]+"</h3></header>"+
                       "<p><a href=\""+doc.data()["公司連結"]+"\">"+doc.data()["公司"]+"</a>｜"+doc.data()["任職起日"]+" – "+doc.data()["任職迄日"]+"<br />"+
                       "<span style=\"font-size:16px;\">"+doc.data()["公司簡述"]+"</span></p><ul>";
            for (var i = 0 ; i < doc.data()["負責項目"].length ; i++){
                expInfo += "<li>"+doc.data()["負責項目"][i]+"</li>";
            }
            expInfo += "</ul></section>";      
        });	        
        document.getElementById("expInfo").innerHTML=expInfo;
    });	

    // 大標題
    if (style){
        if (style === "Work"){ 
            headerMsg = "<h2>職 場 工 作 經 驗</h2><p style=\"font-size:18px;\">真正的成就，不在於做了一件偉大的事，而是累積每天的平凡。</p>"+
                        "<a class=\"image featured\"><img src=\"images/Work.jpg\" alt=\"\" /></a>"; 
        }
        else if (style === "School"){ 
            headerMsg = "<h2>在 校 工 讀 經 驗</h2><p style=\"font-size:18px;\">後悔是一種耗費精神的情緒，後悔是比損失更大的損失，比錯誤更大的錯誤，所以不要後悔。</p>"+
                        "<a class=\"image featured\"><img src=\"images/School.jpg\" alt=\"\" /></a>";
        }
    }
    document.getElementById("headerMsg").innerHTML= headerMsg;
};

// 發問專區 - Experience
function getQAForm(){
    var validationSuccess = $("#validation-success");

    $("#QAForm").kendoForm({
        orientation: "horizontal",
        formData: {
            Email: "",
            Question: ""
        },
        items: [
            {
                field: "Email",
                label: "Email",
                validation: { required: true, email: true },
                editor: "TextBox"
            },
            {
                field: "Question",
                label: "Question",
                validation: { required: true },
                editor: "TextBox"
            }
        ],
        validateField: function(e) {
            validationSuccess.html("");
        },
        submit: function(e) {
            e.preventDefault();
            if (confirm("確定要發問嗎？") == true) {
                db.collection("QA").add({
                    Email: $("#Email").data("kendoTextBox").value(),
                    Question: $("#Question").data("kendoTextBox").value(),
                    Answer: "",
                    featured: false
                });
                window.alert("已送出發問！");   
                $("#QAForm")[0].reset();               
            }
            else {
                window.alert("已取消發問！");
            };                 
        },
        clear: function(ev) {
            validationSuccess.html("");
        }
    });
};

// 解答專區 - Experience
function getAnswer(){
    var ansInfo = "";
    db.collection("QA").where("featured", "==", true).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            ansInfo += "<p style=\"font-size:16px;\"><b>Q：</b>"+doc.data()["Question"]+"<br /><b>A：</b>"+doc.data()["Answer"]+"</p>";      
        });	        
        document.getElementById("ansInfo").innerHTML=ansInfo;
    });	
};

// 日曆 - index、aboutMe、Experience
function getScheduler(){
    $("#scheduler").kendoScheduler({
        height: 450,
        editable: false,
        dataSource: [
            {
                start: new Date(),
                end: new Date(),
                title: "Today"
            }
        ],
        views: [
            { type: "month", selected: true },
            "year"
        ]
    });
};

// 作品類輪播 - index
function getSlideshow(){
    var ssInfo = "";
    db.collection("Portfolio").where("作品名稱", "in", ["Fall guys情報站", "Where Is My Lunch", "裝文青", "「憶起」在地老化", "Hello World", "Personal Web"]).get().then(function(querySnapshot) {
        var i = 0;
        while (i<2){
            querySnapshot.forEach(function(doc) {
                ssInfo += "<article><a href=\"#\" class=\"image featured\"><img src=\"images/"+doc.data()["相關圖片"]+".jpg\" alt=\"\"/></a><header>"+
                          "<h3><a href=\""+doc.data()["相關連結"]+"\">"+doc.data()["作品名稱"]+"</a></h3></header><p>"+doc.data()["作品簡述"]+"</p></article>";     
            });
            i++;	
        };                
        document.getElementById("ssInfo").innerHTML=ssInfo;
    });	    
};

// 取得網址後帶的參數 - Portfolio
function getWebStyle_P(url){
    var style = "";
    //再來用去尋找網址列中是否有資料傳遞(QueryString)
    if (url.indexOf("?")!=-1){
        //在此直接將各自的參數資料切割放進ary中
        var ary = url.split("?")[1].split("&");        
        //下迴圈去搜尋每個資料參數
        for (i=0;i<=ary.length-1;i++){
            //如果資料名稱為id的話那就把他取出來
            if (ary[i].split("=")[0] == "style"){
                style = ary[i].split("=")[1];
                style = style.replace("%20", " ");
                getPorInfo(style);
            };                
        };       
    };    
};

// Web Design、Application Design、System Design、Data Analysis及Artificial Intelligence經驗資料填入 - Portfolio
function getPorInfo(style){
    var porInfo = "";
    db.collection("Portfolio").where("類型", "==", style).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            porInfo += "<section><header><a href=\""+doc.data()["相關連結"]+"\"><h3>"+doc.data()["作品名稱"]+"<i style=\"padding-left:10px;\" class=\"fa fa-info-circle\"></i></h3></a></header>"+
                       "<p><span style=\"font-size:16px;\">"+doc.data()["作品簡述"]+"</span></p><ul>";
            for (var i = 0 ; i < doc.data()["使用工具"].length ; i++){
                porInfo += "<li>"+doc.data()["使用工具"][i]+"</li>";
            }
            porInfo += "</ul></section>";      
        });	        
        document.getElementById("porInfo").innerHTML=porInfo;
    });	

    // 大標題
    if (style){
        if (style === "Web Design"){ 
            headerMsg = "<h2>網　頁　設　計</h2><p style=\"font-size:18px;\">人可以改變環境，環境可以影響人，而設計則可以改變人和環境。</p>"+
                        "<a class=\"image featured\"><img src=\"images/Web Design.jpg\" alt=\"\" /></a>"; 
        }
        else if (style === "Application Design"){ 
            headerMsg = "<h2>應　用　設　計</h2><p style=\"font-size:18px;\">後悔是一種耗費精神的情緒，後悔是比損失更大的損失，比錯誤更大的錯誤，所以不要後悔。</p>"+
                        "<a class=\"image featured\"><img src=\"images/Application Design.jpg\" alt=\"\" /></a>";
        }
        else if (style === "System Design"){ 
            headerMsg = "<h2>系　統　設　計</h2><p style=\"font-size:18px;\">設計是恒久的，在經過很長一段歲月后仍然具有耐看的質感。</p>"+
                        "<a class=\"image featured\"><img src=\"images/System Design.jpg\" alt=\"\" /></a>";
        }
        else if (style === "Data Analysis"){ 
            headerMsg = "<h2>資　料　分　析</h2><p style=\"font-size:18px;\">數據科學家收集數據，把數據融入到易懂的形式中，讓數據講故事，並且把故事講給別人聽。</p>"+
                        "<a class=\"image featured\"><img src=\"images/Data Analysis.jpg\" alt=\"\" /></a>";
        }
        else if (style === "Artificial Intelligence"){ 
            headerMsg = "<h2>人　工　智　慧</h2><p style=\"font-size:18px;\">擔心人工智慧會讓人類覺得自卑，實際上即使是看到一朵花，我們應該多少感到一些自愧不如。</p>"+
                        "<a class=\"image featured\"><img src=\"images/Artificial Intelligence.jpg\" alt=\"\" /></a>";
        }
    }
    document.getElementById("headerMsg").innerHTML= headerMsg;
};

// 技能發展綜合圖 - Portfolio
function getCombinationChart(){
    var title = {
        text: ""   
     };
     var xAxis = {
        categories: ["基礎資訊管理知識", "專業管理能力", "軟體開發能力", "資訊科技應用能力", "健康照護資訊應用能力", "獨立思考與創新能力", "語文溝通與表達能力", "團隊合作能力"]
     };
     var yAxis = {
        min: 0,
        title: {
           text: "大學修課能力積分"         
        }      
     };
     var labels = {
        items: [{
           html: "能力指標",
              style: {
                 left: "120px",
                 top: "18px",
                 color: (Highcharts.theme && Highcharts.theme.textColor) || "black"
              }
        }]
     };
     var series= [{
          type: "column",
              name: "一年級",
              data: [750, 250, 450, 440, 125, 200, 270, 50]
          }, {
              type: "column",
              name: "二年級",
              data: [1375, 1000, 1500, 700, 750, 450, 550, 200]
          }, {
              type: "column",
              name: "三年級",
              data: [2250, 1475, 2270, 1510, 1010, 750, 1010, 470]
          }, {
              type: "column",
              name: "四年級",
              data: [2250, 1500, 2500, 1750, 1450, 1050, 1250, 500]
          }, {
              type: "spline",
              name: "Average",
              data: [1656, 1056, 1680, 1100, 840, 612, 770, 305],
              marker: {
                  lineWidth: 2,
                  lineColor: Highcharts.getOptions().colors[8],
                  fillColor: "white"
              }
          }, {
              type: "pie",
              name: "總指數",
              data: [{
                  name: "基礎資訊管理知識",
                  y: 2250,
                  color: Highcharts.getOptions().colors[0]
              }, {
                  name: "專業管理能力",
                  y: 1500,
                  color: Highcharts.getOptions().colors[1]
              }, {
                  name: "軟體開發能力",
                  y: 2500,
                  color: Highcharts.getOptions().colors[2] // Joe 的颜色
              }, {
                  name: "資訊科技應用能力",
                  y: 1750,
                  color: Highcharts.getOptions().colors[3] // Joe 的颜色
              }, {
                  name: "健康照護資訊應用能力",
                  y: 1450,
                  color: Highcharts.getOptions().colors[4] // Joe 的颜色
              }, {
                  name: "獨立思考與創新能力",
                  y: 1050,
                  color: Highcharts.getOptions().colors[5] // Joe 的颜色
              }, {
                  name: "語文溝通與表達能力",
                  y: 1250,
                  color: Highcharts.getOptions().colors[6] // Joe 的颜色
              }, {
                  name: "團隊合作能力",
                  y: 500,
                  color: Highcharts.getOptions().colors[7] // Joe 的颜色
              }],
              center: [200, 30],
              size: 80,
              showInLegend: false,
              dataLabels: {
                  enabled: false
              }
        }
     ];     
        
     var json = {};   
     json.title = title;   
     json.xAxis = xAxis;
     json.yAxis = yAxis;
     json.labels = labels;  
     json.series = series;
     $("#combinationChart").highcharts(json); 
};

// 五大人格 - Portfolio
function getHighchartsTreemap(){
    var title = {
        text: ""   
     };       
     
     var colorAxis = {
        minColor: "#FFFFFF",
        maxColor: Highcharts.getOptions().colors[0]
     };
     
     var series= [{
       type: "treemap",
       layoutAlgorithm: "squarified",
       data: [{
          name: "經驗開放性",
          value: 56,
          colorValue: 1
       }, {
          name: "嚴謹自律性",
          value: 58.4,
          colorValue: 2
       }, {
          name: "外向性",
          value: 53.5,
          colorValue: 3
       }, {
          name: "親和性",
          value: 46.4,
          colorValue: 4
       }, {
          name: "情緒不穩定性",
          value: 35.6,
          colorValue: 5
       }]
     }];     
        
     var json = {};     
     json.title = title;          
     json.colorAxis = colorAxis;   
     json.series = series;       
     
     $("#highchartsTreemap").highcharts(json);
};

// 動態資料 - Portfolio
function getLiveRandom(){
    var chart = {
        type: "spline",
        animation: Highcharts.svg, // don"t animate in IE < IE 10.
        marginRight: 10,
        events: {
           load: function () {
              // set up the updating of the chart each second
              var series = this.series[0];
              setInterval(function () {
                 var x = (new Date()).getTime(), // current time
                 y = Math.random();
                 series.addPoint([x, y], true, true);
              }, 1000);
           }
        }
     };
     var title = {
        text: ""   
     };   
     var xAxis = {
        type: "DateTime",
        tickPixelInterval: 150
     };
     var yAxis = {
        title: {
           text: ""
        },
        plotLines: [{
           value: 0,
           width: 1,
           color: "#808080"
        }]
     };
     var tooltip = {
        formatter: function () {
        return "<b>" + this.series.name + "</b><br/>" +
           Highcharts.dateFormat("%Y-%m-%d %H:%M:%S", this.x) + "<br/>" +
           Highcharts.numberFormat(this.y, 2);
        }
     };
     var plotOptions = {
        area: {
           pointStart: 1940,
           marker: {
              enabled: false,
              symbol: "circle",
              radius: 2,
              states: {
                 hover: {
                   enabled: true
                 }
              }
           }
        }
     };
     var legend = {
        enabled: false
     };
     var exporting = {
        enabled: false
     };
     var series= [{
        name: "Random data",
        data: (function () {
           // generate an array of random data
           var data = [],time = (new Date()).getTime(),i;
           for (i = -19; i <= 0; i += 1) {
              data.push({
                 x: time + i * 1000,
                 y: Math.random()
              });
           }
           return data;
        }())    
     }];     
        
     var json = {};   
     json.chart = chart; 
     json.title = title;     
     json.tooltip = tooltip;
     json.xAxis = xAxis;
     json.yAxis = yAxis; 
     json.legend = legend;  
     json.exporting = exporting;   
     json.series = series;
     json.plotOptions = plotOptions;
     
     
     Highcharts.setOptions({
        global: {
           useUTC: false
        }
     });
     $("#liveRandomData").highcharts(json);
};