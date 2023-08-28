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
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import FortuneWheel from 'vue-fortune-wheel'
  import 'vue-fortune-wheel/style.css'
  
  const prizeId = ref(0)
  
  const wheelEl = ref()
  const canvasVerify = ref(false) // Whether the turntable in canvas mode is enabled for verification
  const verifyDuration = 2
  const canvasOptions = {
    btnWidth: 140,
    borderColor: '#584b43',
    borderWidth: 6,
    lineHeight: 30
  }
  
  const prizesCanvas = [
    {
      id: 1, //* The unique id of each prize, an integer greater than 0
      name: 'Blue', // Prize name, display value when type is canvas (this parameter is not needed when type is image)
      value: 'Blue\'s value', //* Prize value, return value after spinning
      bgColor: '#45ace9', // Background color (no need for this parameter when type is image)
      color: '#ffffff', // Font color (this parameter is not required when type is image)
      probability: 30 //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
    },
    {
      id: 2,
      name: 'Red',
      value: 'Red\'s value',
      bgColor: '#dd3832',
      color: '#ffffff',
      probability: 40
    },
    {
      id: 3,
      name: 'Yellow',
      value: 'Yellow\'s value',
      bgColor: '#fef151',
      color: '#ffffff',
      probability: 30
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
    alert(prize.value)
  }
  
  function onChangePrize (id) {
    prizeId.value = id
  }
  </script>