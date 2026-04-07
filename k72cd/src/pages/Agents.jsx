import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Agents = () => {
  gsap.registerPlugin(ScrollTrigger)
  const imgDivRef = useRef(null);
  const imageRef = useRef(null);
    const imageArray = [
    'https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/Olivier_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/Lawrence_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/HugoJoseph_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/ChantalG_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/MyleneS_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/SophieA_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/Claire_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/Michele_480X640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/MEL_480X640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/CAMILLE_480X640_2-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/MAXIME_480X640_2-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/MEGGIE_480X640_2-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/joel_480X640_3-480x640.jpg',
  ]
  useGSAP(()=>{
    gsap.to(imgDivRef.current,{
      scrollTrigger:{
        trigger:imgDivRef.current,
        // markers: true,
        start:'top 35%',
        end:'top -150%',
        scrub:true,
        pin:true,
        onUpdate: (elme) =>{
          let imageIndex;
          if(elme.progress < 1){

            imageIndex = Math.floor(elme.progress * imageArray.length);
          }else{
            imageIndex = imageArray.length -1;
          }
          imageRef.current.src = imageArray[imageIndex];
        }
      }
    })
  })
  return (
    <div>
      <div className="section1">
        <div ref={imgDivRef} className="absolute h-[20vw] overflow-hidden w-[15vw] rounded-3xl top-40 left-[30vw]  bg-red-500 ">
          <img
            ref={imageRef}
            className="h-full object-cover w-full  "
            src="https://k72.ca/images/teamMembers/Carl_480x640.jpg?w=480&h=640&fit=crop&s=f0a84706bc91a6f505e8ad35f520f0b7"
            alt=""
          />
        </div>
        <div className="relative font-[font2]">
          <div className="mt-[55vh]">
            <h1 className="text-[20vw] text-center uppercase leading-[17vw]">
              Soixan7e <br />
              Douze
            </h1>
          </div>

          <div className="pl-[40%] mt-20 ">
            <p className="text-4xl ">
              {" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Notre curiosité
              nourrit notre créativité. On reste humbles et on dit non aux gros
              egos, même le vôtre. Une marque est vivante. Elle a des valeurs,
              une personnalité, une histoire. Si on oublie ça, on peut faire de
              bons chiffres à court terme, mais on la tue à long terme. C’est
              pour ça qu’on s’engage à donner de la perspective, pour bâtir des
              marques influentes.{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="section2 h-screen"></div>
    </div>
  );
};

export default Agents;
