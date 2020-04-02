type Component255 = number
type Component100 = number
type RGB255 = Component255[]
type RGB100 = Component100[]
type Colorcode = string


interface Color {
    'color' : RGB255;
    'hex': Colorcode;
} 

let merge = (a,b,f) => a.reduce(
      ((acc,x) => [
          acc[0].slice(1),
          acc[1].concat([f(x,acc[0][0])])
        ]),
      [b,[]]
    )[1]
 
let zip = (a,b) => merge(
  a.slice(0,Math.min(a.length,b.length)),
  b.slice(0,Math.min(a.length,b.length)), 
  (x,y)=>[x,y]);
let RGB = {
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

    flushInputs : () => RGB.outputs.map(
        (elem:any) => { elem.value = ''}),

    collectInputs : () => RGB.inputs.reduce(
        (acc,elem:any) => {
            acc.push(elem.value)
            return acc
        },[]),
    output : (rgb) => zip(
        RGB.outputs,rgb)
        .map(pair => {pair[0].textContent = pair[1]}),

    flushOutputs : () => RGB.output(['','','']),
}
var currcolor:RGB100 = [0,0,0]
const BYTE_TO_PERCENTAGE = 100/255

function color_code(color:RGB255) : Colorcode{
  return '#' + color.map(x => x.toString(16))
  .join('');
}

function rgb100(color:RGB255):RGB100{
    return color.map(
        x => Math.round(x*BYTE_TO_PERCENTAGE))
}
  
function subtract_rgbs<RGB>(color:RGB, subtracted:RGB): RGB{
  return zip(color,subtracted)
        .map(pair => pair[0] - pair[1])
}

                                                                  
function randComponent():Component255{
  return Math.round(Math.random()*255)
};
                                                                  
function randomColor():Color {
  let color : RGB255 = [randComponent(),randComponent(),randComponent()]
  return {
    'color' : rgb100(color),
    'hex'   : color_code(color),
  }
}
function setcolor(){
  RGB.flushInputs()
  let square = document.getElementById('color-output')
  let randcolor = randomColor()
  square.setAttribute('style','background-color:'  + randcolor.hex)
  currcolor = randcolor.color
};
function outputResults(results,true_color){
  function message(true_and_results:[RGB100,RGB100]){
      return 'true: '+ true_and_results[0] + '; diff: '+ true_and_results[1]
  }
  RGB.output(
    zip(true_color,results).map(message)
  )
}

function calculateResult(){
  
  let answers = RGB.collectInputs()
  let rgb = currcolor
  outputResults(subtract_rgbs(rgb, answers), rgb)
}
