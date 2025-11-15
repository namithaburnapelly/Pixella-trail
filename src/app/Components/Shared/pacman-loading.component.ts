import { Component } from '@angular/core';

@Component({
  selector: 'app-pacman-loading',
  standalone: false,
  template: `
    <div class="pac-man mx-4">
      <div class="balls">
        <div class="ball ball1"></div>
        <div class="ball "></div>
        <div class="ball "></div>
        <div class="ball "></div>
        <div class="ball "></div>
      </div>
    </div>
  `,
  styles: [
    `
      .pac-man {
        position: relative;
        width: 30px;
        height: 30px;
      }

      .pac-man::before,
      .pac-man::after {
        content: '';
        position: absolute;
        width: 30px;
        height: 15px;
        background: #fed75a;
        border-radius: 30px 30px 0 0;
        transform-origin: center bottom;
      }

      .pac-man::after {
        top: 15px;
        border-radius: 0 0 30px 30px;
        transform-origin: center top;
        animation: eating-bottom 0.5s infinite;
      }

      .pac-man::before {
        animation: eating-top 0.5s infinite;
      }

      .balls {
        width: 160px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        /* background: rebeccapurple; */
        position: absolute;
        right: -150px;
      }

      .ball {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        position: relative;
        background: #fed75a;
        animation: move-left 0.5s infinite ease-in-out;
      }

      .ball1 {
        animation: ball-size 0.5s infinite ease-in-out,
          move-left 0.5s infinite ease-in-out;
      }

      @keyframes eating-top {
        0% {
          transform: rotate(-40deg);
        }
        50% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(-40deg);
        }
      }

      @keyframes eating-bottom {
        0% {
          transform: rotate(40deg);
        }
        50% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(40deg);
        }
      }

      @keyframes ball-size {
        0%,
        100% {
          width: 10px;
          height: 10px;
        }
        50% {
          width: 0px;
          height: 0px;
        }
      }

      @keyframes move-left {
        0%,
        100% {
          right: 0px;
        }
        99% {
          right: 32px;
        }
      }
    `,
  ],
})
export class PacmanLoadingComponent {}
