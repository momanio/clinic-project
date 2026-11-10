import { useId } from 'react'
import { useLanguage } from '../i18n/useLanguage'

// Original vector artwork: an architectural study of a quiet clinic reception.
export function ClinicIllustration() {
  const id = useId().replaceAll(':', '')
  const { t } = useLanguage()
  return (
    <svg
      className="clinic-illustration"
      viewBox="0 0 560 530"
      fill="none"
      role="img"
      aria-labelledby={`${id}-title`}
    >
      <title id={`${id}-title`}>{t.illustrationTitle}</title>
      <defs>
        <linearGradient
          id={`${id}-wall`}
          x1="115"
          y1="50"
          x2="440"
          y2="440"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fffdf6" />
          <stop offset="1" stopColor="#e7e5d5" />
        </linearGradient>
        <linearGradient
          id={`${id}-arch`}
          x1="235"
          y1="130"
          x2="370"
          y2="400"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#a3c9b3" />
          <stop offset="1" stopColor="#d4e5cf" />
        </linearGradient>
        <linearGradient
          id={`${id}-seat`}
          x1="100"
          y1="310"
          x2="240"
          y2="410"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#799f86" />
          <stop offset="1" stopColor="#47745e" />
        </linearGradient>
        <linearGradient
          id={`${id}-floor`}
          x1="100"
          y1="360"
          x2="450"
          y2="480"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f2e8d8" />
          <stop offset="1" stopColor="#dedac6" />
        </linearGradient>
        <linearGradient
          id={`${id}-cross`}
          x1="235"
          y1="100"
          x2="310"
          y2="160"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fffdf7" />
          <stop offset="1" stopColor="#d9e0cc" />
        </linearGradient>
        <filter
          id={`${id}-shadow`}
          x="-40%"
          y="-40%"
          width="180%"
          height="180%"
        >
          <feDropShadow
            dx="0"
            dy="15"
            stdDeviation="15"
            floodColor="#305b40"
            floodOpacity=".13"
          />
        </filter>
      </defs>
      <ellipse
        cx="280"
        cy="456"
        rx="215"
        ry="30"
        fill="#526e56"
        opacity=".08"
      />
      <g filter={`url(#${id}-shadow)`}>
        <path d="m82 369 267-53 156 97-255 71-168-87v-28Z" fill="#d0d0b8" />
        <path
          d="m82 369 267-53 156 97-255 65-168-109Z"
          fill={`url(#${id}-floor)`}
        />
        <path
          d="M110 369V157C110 61 201 34 277 72l164 76v230L285 421 110 369Z"
          fill="#d9ddc9"
        />
        <path
          d="M98 364V151C98 55 189 28 265 66l164 76v230l-156 43L98 364Z"
          fill={`url(#${id}-wall)`}
        />
        <path
          d="M254 388V218c0-53 39-79 75-60l54 27v173l-129 30Z"
          fill="#c5cbb4"
        />
        <path
          d="M268 384V218c0-43 28-65 60-49l44 22v172l-104 21Z"
          fill={`url(#${id}-arch)`}
        />
        <path
          d="m317 171 1 203M270 270l101-24"
          stroke="#eef5e8"
          strokeWidth="5"
          opacity=".8"
        />
        <path d="m279 211 19-4v46l-19 4v-46Z" fill="#e5efdf" opacity=".4" />
        <path d="m341 283 18-4v66l-18 4v-66Z" fill="#e5efdf" opacity=".3" />
        <path d="M272 392v-13l105-23v10l-105 26Z" fill="#faf8ef" />
        <path d="m141 182 62 24v75l-62-23v-76Z" fill="#e4ddca" />
        <path d="m146 189 52 20v64l-52-19v-65Z" fill="#fffdf6" />
        <path
          d="m157 231 9-10 7 16 7-9 9 3"
          stroke="#85a58e"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="m155 246 33 13" stroke="#c5c9b6" strokeWidth="2" />
        <path
          d="m243 105 12 5v15l15 6v14l-15-6v16l-12-5v-16l-15-5v-14l15 5v-15Z"
          fill="#c0cbb7"
        />
        <path
          d="m239 101 12 5v15l15 6v14l-15-6v16l-12-5v-16l-15-5v-14l15 5v-15Z"
          fill={`url(#${id}-cross)`}
        />
        <path d="m119 311 76 27v65l-76-28v-64Z" fill={`url(#${id}-seat)`} />
        <path
          d="M119 314v-25c0-14 9-20 20-16l49 18c10 3 15 13 15 23v31l-84-31Z"
          fill="#8cac8e"
        />
        <path
          d="m126 308 1-19c0-7 5-11 11-9l21 8v32l-33-12ZM162 320v-31l25 9c6 2 9 7 9 14v20l-34-12Z"
          fill="#a3bba0"
        />
        <path d="m118 328 76 27 28-10-75-27-29 10Z" fill="#b1c5a7" />
        <path d="m194 355 28-10v40l-28 18v-48Z" fill="#5e8266" />
        <path
          d="m116 314 8 3v47l-8-3v-47ZM190 341l9 3v40l-9 3v-46Z"
          fill="#3f6651"
        />
        <path
          d="m126 377 3 20M203 393v14"
          stroke="#756c52"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <ellipse cx="279" cy="401" rx="40" ry="15" fill="#e3d1b4" />
        <path d="M239 395v7c0 20 80 20 80 0v-7h-80Z" fill="#d8c3a1" />
        <ellipse cx="279" cy="395" rx="40" ry="15" fill="#f7efdd" />
        <path
          d="m257 411-4 27M302 410l5 27"
          stroke="#b4a587"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path d="m267 391 18 5 14-5-18-5-14 5Z" fill="#597e65" />
        <path d="m267 391v3l18 6v-4l-18-5Z" fill="#d1d7bf" />
        <ellipse
          cx="396"
          cy="388"
          rx="21"
          ry="8"
          fill="#6d7d55"
          opacity=".15"
        />
        <path d="m379 353 5 34c1 10 26 10 28 0l5-34h-38Z" fill="#d4aa83" />
        <ellipse cx="398" cy="353" rx="19" ry="7" fill="#e2bc95" />
        <path
          d="M399 355V271m0 60-21-26m21 12 22-28m-22 12-11-29"
          stroke="#587c56"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M399 294c-19-3-22-21-15-27 14 1 20 12 15 27ZM400 321c1-22 13-35 26-33 4 14-8 31-26 33ZM393 323c-24 1-34-16-31-27 15-4 29 10 31 27ZM399 279c-11-17-7-33 3-38 13 8 9 27-3 38Z"
          fill="#6f9467"
        />
        <path
          d="M399 294c-7-12-11-18-15-27M400 320l25-31"
          stroke="#a4bc8b"
          strokeWidth="1.2"
        />
        <path d="m419 212 16 7v98l-16-8v-97Z" fill="#b8c9b4" opacity=".45" />
      </g>
      <g opacity=".7" stroke="#7f9d7f" strokeWidth="1.5">
        <path d="M68 185v17m-8-8h16M458 291v13m-6-6h12M354 62v13m-6-6h12" />
      </g>
      <circle cx="102" cy="249" r="3" fill="#dcaa7d" />
      <circle cx="448" cy="107" r="5" fill="#dcaa7d" />
    </svg>
  )
}
