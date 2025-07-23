<template>
  <main>
    <section>
      <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7">
          <p class="max-w-2xl mt-10 font-bold md:text-lg lg:text-lg ">WHO WE ARE</p>
          <h1 class="max-w-2xl mb-4 text-2xl font-bold tracking-tight leading-none uppercase md:text-4xl lg:text-4xl xl:text-4xl
bg-gradient-to-r from-green-200 via-syentiaGreen to-green-200 bg-clip-text text-transparent">
            We act in a straightforward, honest, and ethical manner, doing precisely what we say we would do.
          </h1>
        </div>
        <div class=" lg:mt-0 lg:col-span-5 lg:flex">
          <img src="../assets/Company-amico.png" alt="mockup">

        </div>
      </div>
    </section>



    <section class=" ">
      <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:grid-cols-2 lg:gap-8">
        <div class="mr-auto place-self-center lg:col-span-1 lg:pr-8 lg:border-r-2 lg:border-gray-900">
          <h1 class="max-w-2xl mb-4 text-2xl text-syentiaGreen uppercase font-bold tracking-tight leading-none">
            Our Mission
          </h1>
          <p class="max-w-2xl mb-6 font-semibold  lg:mb-8 md:text-lg lg:text-xl">
            Our mission is to establish cloud computing as an essential asset through customized solutions that integrate cutting-edge technology and our in-house expertise.
          </p>
        </div>
        <div class="place-self-center lg:col-span-1 lg:pl-8">
          <h1 class="max-w-2xl mb-4 text-syentiaGreen uppercase text-2xl font-bold tracking-tight leading-none">
            Our Vision
          </h1>
          <p class="max-w-2xl mb-6 font-semibold lg:mb-8 md:text-lg lg:text-xl">
            To lead in virtualization and cloud computing consulting worldwide by delivering innovative technologies, excellent end-to-end solutions, competitive pricing, and rapid client response.
          </p>
        </div>
      </div>
    </section>

    <section class="flex items-center justify-center w-full">
      <div class="max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 text-center">
        <h1 class="mb-4 items-align-center text-syentiaGreen uppercase text-2xl font-bold md:text-4xl xl:text-4xl">
          Why Choose Us
        </h1>
        <p class="max-w-2xl mb-6 items-align-center font-semibold lg:mb-8 md:text-lg lg:text-xl">
          We seek to impact lives and help people protect the things they love.        </p>
      </div>
    </section>
    <AboutSection1 />
    <HomeContent />

    <div class=" py-14 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <dl class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
          <div class="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt class="text-base/7">Happy Clients</dt>
            <dd class="order-first text-2xl font-semibold tracking-tight ">Successfully Served </dd>
            <dd class="order-first text-4xl font-bold tracking-tight text-syentiaGreen">17</dd>
          </div>
          <div class="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt class="text-base/7 ">Successfully Completed</dt>
            <dd class="order-first text-2xl font-semibold tracking-tight  ">Consulting Projects </dd>
            <dd class="order-first text-4xl font-bold tracking-tight text-syentiaGreen">35</dd>
          </div>
          <div class="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt class="text-base/7 ">Completed Software Builds</dt>
            <dd class="order-first text-2xl font-semibold tracking-tight  ">Software Services </dd>
            <dd class="order-first text-4xl font-bold tracking-tight text-syentiaGreen">25</dd>
          </div>
          <div class="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt class="text-base/7 ">Digital Marketing Projects</dt>
            <dd class="order-first text-2xl font-semibold tracking-tight  ">Marketing Services </dd>
            <dd class="order-first text-4xl font-bold tracking-tight text-syentiaGreen">15</dd>
          </div>
        </dl>
      </div>
    </div>

    <HomeBrands />
    <CareersSection1 />

  </main>
</template>
<script setup>
</script>
