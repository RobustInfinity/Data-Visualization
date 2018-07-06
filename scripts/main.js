var ctx = document.getElementById('myChart').getContext('2d');
var data = {
        labels: [],
        datasets: [{
            label: '',
            backgroundColor: 'rgb(0,123,255, 0.4)',
            borderColor: 'rgb(0,123,255)',
            data: [],
        }]
    }
              function Const(topic, intensity ,relevance, likelihood){
                this.topic  = topic
                this.intensity = intensity
                this.relevance = relevance
                this.likelihood = likelihood
            }
            var Topic = new Const([], [] ,[], []);
            var Sector = new Const([], [], [], []);
            var Region = new Const([], [] ,[], []);
            var Pestle = new Const([], [] ,[], []);

            var parameters = [[Topic,'topic'], 
                              [Sector,'sector'], 
                              [Region,'region'], 
                              [Pestle,'pestle']];


            $.getJSON('scripts/jsondata.json')
               .done(function (Data) {
                     var num =Data.length;
                     var myList = Data;
                    getTopic(myList);
                    getSector(myList);
                    getRegion(myList)
                    getPestle(myList)
                    getData(myList) 
                    for(var i = 0; i < parameters.length ; i++){
                      getIntensity(myList, parameters[i][0], parameters[i][1])
                      getRelevance(myList, parameters[i][0], parameters[i][1])
                      getLikelihood(myList, parameters[i][0], parameters[i][1])
                    }
                            
                  
                    setData(Topic.intensity, Topic.topic, 'Avg. Intensity', 'rgb(0,123,255, 0.4)', 'rgb(0,123,255)');
                      var chart = new Chart(ctx, {
                      // The type of chart we want to create
                      type: 'radar',
                      // The data for our dataset
                      data: data,
                      // Configuration options go here
                      options: {
                          scale: {
                      ticks: {
                          suggestedMin: 0,
                          suggestedMax: limit
                        }
                    },
                        }
                    });
                    document.querySelector('#label').textContent = 'Topic'
                    document.querySelector('#value').textContent = 'Intensity'
                    document.getElementById('submit').addEventListener('click',function(){
                      label();
                    })
                    function label(){
                      var labels = [];
                      
                      if (document.getElementById('topic').checked) {
                        // console.log(document.getElementById('topic').value);
                        document.querySelector('#label').textContent = 'Topic'
                        labels = Topic.topic;
                        value(Topic, labels)
                      }
                      if (document.getElementById('sector').checked) {
                        // console.log(document.getElementById('sector').value);
                        document.querySelector('#label').textContent = 'Sector'
                        labels = Sector.topic
                        value(Sector, labels)
                      }
                      if (document.getElementById('region').checked) {
                        // console.log(document.getElementById('region').value);
                        document.querySelector('#label').textContent = 'Region'
                        labels = Region.topic
                        value(Region, labels)
                      }
                      if (document.getElementById('pestle').checked) {
                        // console.log(document.getElementById('pestle').value);
                        document.querySelector('#label').textContent = 'Pestle'
                        labels = Pestle.topic
                        value(Pestle, labels)
                      }
                    }
                    function value(variable, labels){
                      var label = '';
                      var data = []
                      var bgColor = ''
                      var borderColor = ''
                      if (document.getElementById('intensity').checked) {
                        // console.log(document.getElementById('intensity').value);
                        document.querySelector('#value').textContent = 'Intensity'
                        data = variable.intensity;
                        bgColor = 'rgb(0,123,255, 0.4)'
                        borderColor = 'rgb(0,123,255)'
                        label = 'Avg. Intensity'
                      }
                      if (document.getElementById('relevance').checked) {
                        // console.log(document.getElementById('relevance').value);
                        document.querySelector('#value').textContent = 'Relevance'
                        data = variable.relevance;
                        bgColor = 'rgb(255,193,7, 0.4)'
                        borderColor = 'rgb(255,193,7)'
                        label = 'Avg. Relevance'
                      }
                      if (document.getElementById('likelihood').checked) {
                        // console.log(document.getElementById('likelihood').value);
                        document.querySelector('#value').textContent = 'Likelihood'
                        data = variable.likelihood;
                        bgColor = 'rgb(40,167,69, 0.4)'
                        borderColor = 'rgb(40,167,69)'
                        label = 'Avg. Likelihood'
                      }
                      addData(chart,labels,data, bgColor, borderColor, label)
                    }
                    
                    function addData(chart, labels, data,bgcolor, borderColor,label) {
                      chart.data.labels = labels;
                      chart.data.datasets[0].label = label
                      chart.data.datasets[0].data = data
                      chart.data.datasets[0].backgroundColor = bgcolor,
                      chart.data.datasets[0].borderColor = borderColor
                      chart.update();
                  }
               
               });

               var value = [];
               var limit;
                  
               function setData(value, labels,label, bgcolor, borderColor){
                 data.datasets[0].label = label
                 data.datasets[0].backgroundColor = bgcolor
                 data.datasets[0].borderColor = borderColor
                 limit =5;
                //  console.log(labels)
                //  console.log(value)
                for(var i = 0; i < labels.length  ;i ++){
                  data.labels.push(labels[i])
                  data.datasets[0].data.push(value[i])
                 }
                }
/////////////////////////////////////////////////////////////////////
               function getTopic(myList){
                 for(var i = 0 ; i < myList.length ; i++){
                   if(Topic.topic.length === 0){
                     Topic.topic.push(myList[i].topic)
                   }
                   for(var j = 0; j< Topic.topic.length ; j++){
                     if(Topic.topic[j] != myList[i].topic && myList[i].topic != '' ){
                       if(j === (Topic.topic.length - 1)){
                          Topic.topic.push(myList[i].topic);
                          break;
                       }
                       continue;
                     }
                     else{
                       break;
                     }
                   }
                 }
                //  console.log(Topic.topic)
              }
              function getSector(myList){
                for(var i = 0 ; i < myList.length ; i++){
                  if(Sector.topic.length === 0){
                    Sector.topic.push(myList[i].sector)
                  }
                  for(var j = 0; j< Sector.topic.length ; j++){
                    if(Sector.topic[j] != myList[i].sector && myList[i].sector != '' ){
                      if(j === (Sector.topic.length - 1)){
                         Sector.topic.push(myList[i].sector);
                         break;
                      }
                      continue;
                    }
                    else{
                      break;
                    }
                  }
                }
                // console.log(Sector.topic)
             }

             function getRegion(myList){
              for(var i = 0 ; i < myList.length ; i++){
                if(Region.topic.length === 0){
                  Region.topic.push(myList[i].region)
                }
                for(var j = 0; j< Region.topic.length ; j++){
                  if(Region.topic[j] != myList[i].region && myList[i].region != '' ){
                    if(j === (Region.topic.length - 1)){
                       Region.topic.push(myList[i].region);
                       break;
                    }
                    continue;
                  }
                  else{
                    break;
                  }
                }
              }
              // console.log(Region.topic)
           }

           function getPestle(myList){
            for(var i = 0 ; i < myList.length ; i++){
              if(Pestle.topic.length === 0){
                Pestle.topic.push(myList[i].pestle)
              }
              for(var j = 0; j< Pestle.topic.length ; j++){
                if(Pestle.topic[j] != myList[i].pestle && myList[i].pestle != '' ){
                  if(j === (Pestle.topic.length - 1)){
                     Pestle.topic.push(myList[i].pestle);
                     break;
                  }
                  continue;
                }
                else{
                  break;
                }
              }
            }
            // console.log(Pestle.topic)
         }
///////////////////////////////////////////////////////
          function getIntensity(myList,variable,key){
            for(var i =0; i< variable.topic.length ; i++){                      //variable = Topic
              value =[];                                               //key = topic
              for(var j = 0; j < myList.length ; j++){
                if(key === 'topic'){
                    myList[j].key = myList[j].topic
                  }
                  if(key === 'sector'){
                    myList[j].key = myList[j].sector
                  }
                  if(key === 'region'){
                    myList[j].key = myList[j].region
                  }
                  if(key === 'pestle'){
                    myList[j].key = myList[j].pestle
                  }
                if(variable.topic[i] === myList[j].key){
                  if(myList[j].intensity === ''){
                    myList[j].intensity =0 ;
                  }
                  value.push(myList[j].intensity)
                }else{
                  continue;
                }
              }
              variable.intensity.push(value)
            }
            // console.log(variable)
            // console.log(Topic.intensity)
            // console.log(variable.intensity)
            getAverageIntensity(variable)
          }

          function getAverageIntensity(variable){
            var sum;
            for(var i = 0 ;i < variable.intensity.length ; i++){
              sum = 0;
              for(var j = 0 ; j <  variable.intensity[i].length ; j++){
                sum = sum + variable.intensity[i][j];
              }
              variable.intensity[i] = Math.floor(sum/ variable.intensity[i].length);
            }
            // console.log(variable.intensity)
          }
  /////////////////////////////////////////////////////////////////
        function getRelevance(myList, variable , key){
          for(var i =0; i< variable.topic.length ; i++){
            value =[];
            for(var j = 0; j < myList.length ; j++){
              if(key === 'topic'){
                myList[j].key = myList[j].topic
              }
              if(key === 'sector'){
                myList[j].key = myList[j].sector
              }
              if(key === 'region'){
                myList[j].key = myList[j].region
              }
              if(key === 'pestle'){
                myList[j].key = myList[j].pestle
              }
              if(variable.topic[i] === myList[j].key){
                if(myList[j].relevance === ''){
                  myList[j].relevance =0 ;
                }
                value.push(myList[j].relevance)
              }else{
                continue;
              }
            }
            variable.relevance.push(value)
          }
          getAverageRelevance(variable)
        }

        function getAverageRelevance(variable){
          var sum;
          for(var i = 0 ;i < variable.relevance.length ; i++){
            sum = 0;
            for(var j = 0 ; j <  variable.relevance[i].length ; j++){
              sum = sum + variable.relevance[i][j];
            }
            variable.relevance[i] = Math.floor(sum/ variable.relevance[i].length);
          }
        }
  //////////////////////////////////////////////////////////////
  function getLikelihood(myList, variable, key){
    for(var i =0; i< variable.topic.length ; i++){
      value =[];
      for(var j = 0; j < myList.length ; j++){
        if(key === 'topic'){
          myList[j].key = myList[j].topic
        }
        if(key === 'sector'){
          myList[j].key = myList[j].sector
        }
        if(key === 'region'){
          myList[j].key = myList[j].region
        }
        if(key === 'pestle'){
          myList[j].key = myList[j].pestle
        }
        if(variable.topic[i] === myList[j].key){
          if(myList[j].likelihood === ''){
            myList[j].likelihood = 0 ;
          }
          value.push(myList[j].likelihood)
        }else{
          continue;
        }
      }
      variable.likelihood.push(value)
    }
    getAverageLikelihood(variable)
  }

  function getAverageLikelihood(variable){
    var sum;
    for(var i = 0 ;i < variable.likelihood.length ; i++){
      sum = 0;
      for(var j = 0 ; j <  variable.likelihood[i].length ; j++){
        sum = sum + variable.likelihood[i][j];
      }
      variable.likelihood[i] = Math.floor(sum/ variable.likelihood[i].length);
    }
  }
////////////////////////////////////////////////////////////////////



function getData(data){


  var count = 1
  var string = ''
  for(var i = 1; i <= data.length/20 ; i++){
    if( data[i].topic === ''){
      data[i].topic = 'N.A.'
    }
    if(data[i].title === ''){
      data[i].title = 'N.A.'
    }
    if(data[i].sector === ''){
      data[i].sector = 'N.A.'
    }
    if(data[i].insight === ''){
      data[i].insight = 'N.A.'
    }
    if(data[i].source === ''){
      data[i].source = 'N.A.'
    }
    if(data[i].country === ''){
      data[i].country = 'N.A.'
    }
    
     string +=
                  '<button type="button" class="list-group-item list-group-item-action" >'+
                  '<div class="title col-md-12 container-fluid">'+
                  ' <div class="row">'+
                    '<div class="col-md-1 topic"> ' + data[i].topic + '</div>'+
                    '<div class="col-md-3 title">'+ data[i].title +'</div>'+
                    '<div class="col-md-1 sector">' + data[i].sector + '</div>'+
                    '<div class="col-md-3 insight">'+ data[i].insight +'</div>'+
                    '<div class="col-md-2 source">' + data[i].source + '</div>'+
                    '<div class="col-md-2 country">' + data[i].country + '</div>'+
                    '</div></div></button>';
    if(i%10 === 0 && i!=0){
      document.querySelector('.page').innerHTML += '<div class="col-md-12 cells" id="cell-'+ count+'">'+ string + '</div>';
      string = ''
      count++;
    }
  }
}  


