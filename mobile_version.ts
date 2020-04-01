<html>
 <head> 
  <meta name="viewport" content="width=device-width, initial-scale=1"> 
 </head> 
 <body id="color-output" style="background-color: #7f7f7f"> 
  <div>
    <style>
     .rot {
       margin-top: 20%;
       background-color: #7f7f7f;
       height: 40px;
       width: 200px;
       type: range;
     }
   </style>
   <div> 
    <input type="button" style="background-color: #7f7f7f" value="Next color!" onclick="setcolor()"> 
   </div> 
   <div> 
    <input id="r-input" type="range" class="rot" style="background-color: #7f7f7f" value=""> r 
   </div> 
    <b id="r-out" color="red"></b> 
   <div>
    <input id="g-input" type="range" class="rot" style="background-color: #7f7f7f" value=""> g 
   </div>
    <b id="g-out"></b> 
   <div>
    <input id="b-input" type="range" class="rot" style="background-color: #7f7f7f" value=""> b 
   </div> 
   
    <b id="b-out"></b> 
   
   <div> 
    <input id="foo" type="button" style="background-color: #7f7f7f" value="Submit" onclick="calculateResult()"> 
   </div> 
  </div> 
  <script>
type RGB255 = number[]
type RGB100 = number[]
type Colorcode = string
type Component255 = number
Interface Color = {
    'color' : RGB255,
    'hex': Colorcode,
} 
var merge = (a,b,f) => a.reduce(
      ((acc,x) => [
          acc[0].slice(1),
          acc[1].concat([f(x,acc[0][0])])
        ]),
      [b,[]]
    )[1]
 
var zip = (a,b) => merge(
  a.slice(0,Math.min(a.length,b.length)),
  b.slice(0,Math.min(a.length,b.length)), 
  (x,y)=>[x,y]);
var RGB = {
 inputs : [
   document.getElementById('r-input'),
   document.getElementById('g-input'),
   document.getElementById('b-input'),
 ],
 outputs : [
   document.getElementById('r-out'),
   document.getElementById('g-out'),
   document.getElementById('b-out'),
 ],
}
RGB.flushInputs = () => RGB.outputs.map(
  elem => { elem.value = ''}),
  
RGB.collectInputs = () => RGB.inputs.reduce(
    (acc,elem) => {
      acc.push(elem.value)
      return acc
    },[]),
RGB.output = (rgb) => zip(
  RGB.outputs,rgb)
  .map(pair => {pair[0].textContent = pair[1]}),
RGB.flushOutputs = () => RGB.output(['','',''])


const BYTE_TO_PERCENTAGE = 100/255

function color_code(color:RGB255):Colorcode{
  return '#' + color.map(x => x.toString(16))
  .join('');
}

var rgb100 = (color:RGB255) => color.map(
  x => Math.round(x*BYTE_TO_PERCENTAGE));
  
var subtract_rgbs = (color:RGB100, subtracted:RGB100) => 
  zip(color,subtracted)
  .map(pair => pair[0] - pair[1]);

var currcolor:RGB100 = [0,0,0]
                                                                  
function randComponent():Component255{
  return Math.round(Math.random()*255)
};
                                                                  
function randomColor():Color{
  color:RGB255 = [randComponent(),randComponent(),randComponent()]
  return {
    'color': rgb100(color),
    'hex': color_code(color),
  }
}
function setcolor(){
  RGB.flushInputs()
  square = document.getElementById('color-output')
  randcolor = randomColor()
  square.setAttribute('style','background-color:'  + randcolor.hex)
  currcolor = randcolor.color
};
function outputResults(results,true_color){
  message = (true_and_results) => ('true: '+ true_and_results[0] + '; diff: '+ true_and_results[1])
  RGB.output(
    zip(true_color,results).map(message)
  )
}

function calculateResult(){
  
  answers = RGB.collectInputs()
  rgb = currcolor
  outputResults(subtract_rgbs(rgb, answers), rgb)
}
 
</script> 
 </body>
</html>
