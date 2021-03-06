import React, { Component } from 'react';
import $ from 'jquery';
import '../assets/css/Slider.css';

class Slider extends Component {
  componentDidMount() {
    this.initSlider();
    this.prevBtn.on('click', this.prev);
    this.nextBtn.on('click', this.next);
    window.addEventListener('resize', this._handleResize);
  }

  componentWillUnmount() {
    this.prevBtn.off('click', this.prev);
    this.nextBtn.off('click', this.next);
    window.removeEventListener('resize', this._handleResize);
  }

  initSlider() {
    this.slider = $('#'+this.props.children.props['id']);
    this.sliderContainer = this.slider.find('.slides');
    this.slides = this.sliderContainer.find('.slide');
    this.prevBtn = this.sliderContainer.find('#prevSlide');
    this.nextBtn = this.sliderContainer.find('#nextSlide');
    this.slideIndex = parseInt(this.props.slideIndex, 10);
    this.numOfSlides = this.slides.length;
    this.animationSpeed = 1000;
    this.sliderContainer.css('width', (this.numOfSlides*100)+'%');
  }

  _handleResize = () => {
    let slideWidth = this.slides[0].clientWidth;
    this.sliderContainer.css('margin-left', (-1) * slideWidth * (this.slideIndex - 1));
    this.sliderContainer.css('width', (this.numOfSlides*100)+'%');
  }

  prev = (e) => {
    $(this).off(e);
    if (this.slideIndex >= 1) {
      let slideWidth = this.slides[0].clientWidth;
      if (this.slideIndex === 1) {
        this.sliderContainer.animate({'margin-left': '+=' + (-1 * slideWidth * (this.numOfSlides - 1))}, this.animationSpeed, () => {
          this.slideIndex = this.numOfSlides;
        });
      }
      else {
        this.sliderContainer.animate({'margin-left': '+='+slideWidth}, this.animationSpeed, () => {
          this.slideIndex--;
        });
      }
    }
    setTimeout(() => {
      this.prevBtn.on('click', this.prev);
    }, this.animationSpeed);
  }

  next = (e) => {
    $(this).off(e);
    if (this.slideIndex <= this.numOfSlides) {
      let slideWidth = this.slides[0].clientWidth;
      if (this.slideIndex === this.numOfSlides) {
        this.sliderContainer.animate({'margin-left': '-=' + (-1 * slideWidth * (this.numOfSlides - 1))}, this.animationSpeed, () => {
          this.slideIndex = 1;
        });
      }
      else {
        this.sliderContainer.animate({'margin-left': '-='+slideWidth}, this.animationSpeed, () => {
          this.slideIndex++;
        });
      }
    }
    setTimeout(() => {
      this.nextBtn.on('click', this.next);
    }, this.animationSpeed);
  }

  render() {
    return(
      <div className='Slider'>
        {this.props.children}
      </div>
    )
  }
}

export default Slider;
