import { useState, useRef } from 'react';
import BgPattern from '../assets/images/BgPattern.svg';
import PatternCircles from '../assets/images/PatternCircles.svg';
import IconSlider from "../assets/images/IconSlider.svg";
import IconCheck from "../assets/images/IconCheck.svg";

function PricePage() {
  const [pageViews, setPageViews] = useState(100000);
  const [isYearly, setIsYearly] = useState(false);
const sliderRef=useRef(null);
  const PricingData = [
    { views: "10K", value: 10000, monthly: 8 },
    { views: "50K", value: 50000, monthly: 12 },
    { views: "100K", value: 100000, monthly: 16 },
    { views: "500K", value: 500000, monthly: 24 },
    { views: "1M", value: 1000000, monthly: 36 } // Fixed: was 32, should be 36
  ];

  const getCurrentPrice = () => {
let closest=PricingData.reduce((prev, curr) => {
      return Math.abs(curr.value - pageViews) < Math.abs(prev.value - pageViews) ? curr : prev;
    })
let originalPrice=closest.monthly;
    let price=closest.monthly;
   if(isYearly){
    price=price* 0.75; // 25% discount for yearly billing
   }
   return { 
    views: closest.views,
     price: price.toFixed(2) ,
     originalPrice:originalPrice.toFixed(2),
      monthlyPrice: closest.monthly
   }
  };

  const { views, price,originalPrice,monthlyPrice } = getCurrentPrice();
//calculate the percentage discount amount
const calculateDiscount = () => {
if(isYearly) {
  const discountAmount = monthlyPrice * 0.25;
  return discountAmount.toFixed(2);
}
return '0.00';
};
  const getSliderPercentage = () => {
    const min = 10000;
    const max = 1000000;
    return ((pageViews - min) / (max - min)) * 100;
  };
const handleSliderChange = (e) => {
    const value = Number(e.target.value);
    setPageViews(value);
  }
  const handleIconClick = () => {
    const slider = sliderRef.current;
    if(!slider) return;
    slider.focus();

  };
// Drag functionality for the icon
const handleIconMouseDown=(e)=>{
  e.preventDefault();
  const slider=sliderRef.current;
if(!slider) return;
const handleMouseMove=(moveEvent)=>{
  const rect=slider.getBoundingClientRect();
  let x=moveEvent.clientX-rect.left;
x=Math.max(0,Math.min(x,rect.width));
  const percentage=x/rect.width;
  const min=10000;
  const max=1000000;
  const value =Math.round(min + percentage*(max-min));


   // Snap to nearest tier
  let closest = PricingData.reduce((prev, curr) => {
        return (Math.abs(curr.value - value) < Math.abs(prev.value - value) ? curr : prev);
      });
      setPageViews(closest.value);
    };
const handleMouseUp=()=>{
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
};
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);
};
   // Click handler for the icon
 
  return (
    <div className="bg-amber-800 w-full min-h-screen flex justify-center items-center p-4">
      <div className="relative bg-[hsl(223,50%,87%)] w-full max-w-2xl min-h-150  rounded-2xl flex flex-col items-center ">
        
        {/* Header Section */}
        <div className="w-full relative top-auto items-center text-center">
        <div className="relative top-30 md:top-15 left-0 w-full h-full ">
          <div className="relative -top-30 z-50 md:top-20  items-center justify-center">
  <h1 className="text-[hsl(227,35%,25%)] text-2xl md:text-3xl font-bold mb-2">
            Simple, traffic-based pricing
          </h1>
          <p className="text-[hsl(225,20%,60%)] text-sm md:text-base">
            Sign-up for our 30-day trial. No credit card required
          </p>


          <img 
            src={PatternCircles} 
            alt="Pattern Circle" 
            className=" z-10 absolute -top-2 left-1/2 transform -translate-x-1/2 w-20 h-20 md:w-28 md:h-28 opacity-50" 
          />
          </div>
          
              <img src={BgPattern} alt="Background Pattern" className=" h-auto w-full -mt-50 md:mt-1 lg:mt-1 inset-0 md:w-full md:h-full   lg:w-full lg:h-full  " />
        </div>
    </div>
        {/* Pricing Card */}
        <div className="relative z-10 bg-[hsl(230,100%,99%)] w-auto mt-20 md:mt-auto max-w-3xl rounded-xl shadow-2xl p-6 md:p-8">
          

          {/* Pageviews and Price */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="text-[hsl(225,20%,60%)] text-sm uppercase tracking-wider font-bold order-2 md:order-1">
              {views} Pageviews
            </div>
            <div className="flex items-center gap-2 order-1 md:order-2 mb-4 md:mb-0">
              <span className="text-4xl font-bold text-[hsl(227,35%,25%)]">
                ${price}
              </span>
              <span className="text-[hsl(225,20%,60%)] font-bold">
                / {isYearly ? 'year' : 'month'}
              </span>
{/* Show original price crossed out when yearly */}
{isYearly && (
<span className="text-[hsl(225,20%,60%)] line-through text-sm">
  ${originalPrice}
</span>
)}

            </div>
          </div>

          {/* Slider */}
          <div className="relative w-full mb-8">
            <input
            ref={sliderRef}
              type="range"
              min="10000"
              max="1000000"
              step="10000"
              value={pageViews}
              onChange={handleSliderChange}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, hsl(174, 86%, 45%) 0%, hsl(174, 86%, 45%) ${getSliderPercentage()}%, hsl(224, 65%, 95%) ${getSliderPercentage()}%, hsl(224, 65%, 95%) 100%)`
              }}
            />
            <div 
              className=" absolute  top-3 transform -translate-y-1/2 w-10 h-10 rounded-full bg-[hsl(174,86%,45%)] hover:bg-[hsl(173,62%,23%)] flex items-center justify-center shadow-lg transition-all duration-200 cursor-grab active:cursor-grabbing"
              style={{ left: `calc(${getSliderPercentage()}% - 20px)` }}
          onMouseDown={handleIconMouseDown}
          onClick={handleIconClick}
          >

              <img src={IconSlider} alt="Slider" className="w-5 h-5 pointer-events-none" />
              
              
            </div>
          </div>

          {/* Billing Toggle - Fixed Version */}
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 mb-6">
            <span className={`text-sm font-bold ${!isYearly ? 'text-[hsl(227,35%,25%)]' : 'text-[hsl(225,20%,60%)]'}`}>
              Monthly Billing
            </span>
            
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                isYearly ? 'bg-[hsl(174,86%,45%)]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                  isYearly ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            
            <span className={`text-sm font-bold ${isYearly ? 'text-[hsl(227,35%,25%)]' : 'text-[hsl(225,20%,60%)]'}`}>
              Yearly Billing
            </span>
            {isYearly?  (
                <span className="bg-[#bd2a314b] text-red-400 text-xs font-bold rounded-full px-3 py-1"
          
            >
            Save ${calculateDiscount()}/month

            </span>
            ):(
 <span className="bg-[#bd2a314b] text-red-400 text-xs font-bold rounded-full px-3 py-1"
            onClick={() => setIsYearly(true)}
            >
            25% discount
            </span>
            )}
          
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Features and Button */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[hsl(225,20%,70%)] text-sm font-semibold">
                <img src={IconCheck} alt="Check" className="w-4 h-4" />
                Unlimited websites
              </div>
              <div className="flex items-center gap-2 text-[hsl(225,20%,70%)] text-sm font-semibold">
                <img src={IconCheck} alt="Check" className="w-4 h-4" />
                100% data ownership
              </div>
              <div className="flex items-center gap-2 text-[hsl(225,20%,70%)] text-sm font-semibold">
                <img src={IconCheck} alt="Check" className="w-4 h-4" />
                Email reports
              </div>
            </div>
            <button className="bg-[hsl(227,35%,25%)] text-white px-8 py-3 rounded-full font-bold hover:bg-[hsl(227,35%,15%)] transition-all duration-200 whitespace-nowrap">
              Start my trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricePage;