import React, { useState, useEffect, useCallback } from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import './embla.css'

type Microlot = {
    id: number;
    name: string;
    meta?: string;
    variety: string;
    process: string;
    altitude: string;
    notes: string[];
    image: string;
    specUrl: string;
    color: string;
  };

type PropType = {
  slides: Microlot[]
  options?: any
}

const MicrolotsCarouselMobileNew: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [tweenValues, setTweenValues] = useState<number[]>([])

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()

    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target()
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target)
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
          }
        })
      }
      return diffToTarget
    })
    setTweenValues(styles)
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onScroll(emblaApi)
    emblaApi.on('scroll', onScroll)
    emblaApi.on('reInit', onScroll)
  }, [emblaApi, onScroll])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((lot, index) => (
            <div
              className="embla__slide"
              key={index}
              style={{
                ...(tweenValues.length && {
                  transform: `scale(${1 - Math.abs(tweenValues[index]) * 0.3})`,
                  opacity: 1 - Math.abs(tweenValues[index]) * 0.5
                })
              }}
            >
              <img
                className="embla__slide__img"
                src={lot.image}
                alt={lot.name}
              />
               <div className="absolute inset-0 p-5 flex flex-col justify-between text-white text-center">
                      {/* Top: Flavor/Roasting notes removed */}
                      <div />

                      {/* Bottom: Info & CTA */}
                      <div>
                        <h3 className="font-serif text-2xl font-bold leading-tight drop-shadow">
                          {lot.name}
                        </h3>
                        <p className="text-white/80 text-xs mt-1">
                          {lot.meta ? lot.meta : `${lot.variety} · ${lot.process} · ${lot.altitude}`}
                        </p> 
                      </div>
                    </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MicrolotsCarouselMobileNew
