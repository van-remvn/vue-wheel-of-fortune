<template>
    <div>
      <!-- type: image -->
      <!-- <FortuneWheel
        style="width: 500px; max-width: 100%;"
        ref="wheelEl"
        type="image"
        :useWeight="true"
        :verify="canvasVerify"
        :prizeId="prizeId"
        :angleBase="-2"
        :prizes="prizesImage"
        @rotateStart="onImageRotateStart"
        @rotateEnd="onRotateEnd"
      >
        <template #wheel>
          <img src="../assets/wheel.png" style="width: 100%;transform: rotateZ(60deg)" />
        </template>
        <template #button>
          <img src="../assets/button.png" style="width: 180px"/>
        </template>
      </FortuneWheel> -->
  
  
      <!-- type: canvas -->
      <FortuneWheel
        style="width: 500px; max-width: 100%;"
        :verify="canvasVerify"
        :canvas="canvasOptions"
        :prizes="prizesCanvas"
        @rotateStart="onCanvasRotateStart"
        @rotateEnd="onRotateEnd"
      />

      <div style="margin-top: 20px;">
        <button type="button" @click="onCanvasRotateStart" style="background-color: blue; color: white; padding: 15px; border-radius: 5px; font-size: 20px;">Start</button>
        <h3>Current Points: {{currentPoint.toLocaleString()}}</h3>

      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import FortuneWheel from 'vue-fortune-wheel'
  import 'vue-fortune-wheel/style.css'
import { number } from 'yup';
  
  const prizeId = ref(0)

  let currentPoint = ref(10000)
  
  const wheelEl = ref()
  const canvasVerify = ref(false) // Whether the turntable in canvas mode is enabled for verification
  const verifyDuration = 1
  const canvasOptions = {
    btnWidth: 140,
    borderColor: '#584b43',
    borderWidth: 6,
    lineHeight: 30
  }
  
  const prizesCanvas = [
    {
      id: 1, //* The unique id of each prize, an integer greater than 0
      name: '0 point', // Prize name, display value when type is canvas (this parameter is not needed when type is image)
      value: 0, //* Prize value, return value after spinning
      bgColor: '#FF0000', // Background color (no need for this parameter when type is image)
      color: '#ffffff', // Font color (this parameter is not required when type is image)
      probability: 0 //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
    },
    {
      id: 2,
      name: '-100 points',
      value: -100,
      bgColor: '#00FF00',
      color: '#ffffff',
      probability: 0
    },
    {
      id: 3,
      name: '+200 points',
      value: 200,
      bgColor: '#0000FF',
      color: '#ffffff',
      probability: 0
    },
    {
      id: 4,
      name: '+500 points',
      value: 500,
      bgColor: '#FFCCFF',
      color: '#ffffff',
      probability: 0
    },
    {
      id: 5,
      name: '-200 points',
      value: -200,
      bgColor: '#00FFFF',
      color: '#ffffff',
      probability: 0
    },
    {
      id: 6,
      name: '-500 points',
      value: -500,
      bgColor: '#FF00FF',
      color: '#ffffff',
      probability: 100
    },
    {
      id: 7,
      name: '+100 points',
      value: 100,
      bgColor: '#C0C0C0',
      color: '#ffffff',
      probability: 0
    },
  ]
  
  const prizesImage = [
    {
      id: 1, //* The unique id of each prize, an integer greater than 0
      value: 'Blue\'s value', //* Prize value, return value after spinning
      weight: 1 // Weight, if useWeight is true, the probability is calculated by weight (weight must be an integer), so probability is invalid
    },
    {
      id: 2,
      value: 'Red\'s value',
      weight: 0
    },
    {
      id: 3,
      value: 'Yellow\'s value',
      weight: 0
    }
  ]
  
  const prizeRes = computed(() => {
    return prizesCanvas.find(item => item.id === prizeId.value) || prizesCanvas[0]
  })
  
  
  onMounted(() => {
    // wheelEl.value.startRotate() // Can start rotation
  })
  
  // Simulate the request back-end interface
  function testRequest (verified, duration) { // verified: whether to pass the verification, duration: delay time
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(verified)
      }, duration)
    })
  }
  
  function onCanvasRotateStart (rotate) {
    if (canvasVerify.value) {
      const verified = true // true: the test passed the verification, false: the test failed the verification
      testRequest(verified, verifyDuration * 1000).then((verifiedRes) => {
        if (verifiedRes) {
          console.log('Verification passed, start to rotate')
          rotate() // Call the callback, start spinning
          canvasVerify.value = false // Turn off verification mode
        } else {
          alert('Failed verification')
        }
      })
      return
    }
    console.log('onCanvasRotateStart')
  }
  
  function onImageRotateStart () {
    console.log('onImageRotateStart')
  }
  
  function onRotateEnd (prize) {
    // alert(prize.value)
    console.log(prize.value);
    currentPoint.value += prize.value
  }
  
  function onChangePrize (id) {
    prizeId.value = id
  }
  </script>