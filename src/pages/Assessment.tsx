import Header from "@/components/Header";
import IngSection from "@/components/comman/section/IngSection";


function Assessment() {
    return (
        <div className="container">
            <Header />
            <div className="flex">
                <IngSection />

                <div className="W-[600px] mt-[136px] ml-[50px]">
                    <h3 className="font-[400] text-[24px] leading-[29px] italic font-[calibri] text-[#3A3A3A]">Navigate your Green Compass</h3>
                    <img src="../assets/img/Line 23.png" />
                    <p className="font-[400] text-[16px] font-[calibri] leading-[17.77px] text-[#3A3A3A]">Steer through 30 pivotal questions under 6 sustainability pillars to chartyour company's course towards environmental stewardship.</p>
                    <p className="font-[400] text-[16px] font-[calibri] leading-[17.77px] text-[#3A3A3A]">Anchor your answers to draft a sustainable map for your enterprise, revealing pathways to greener practices and innovations.</p>
                </div>
            </div>
        </div>
    );
}

export default Assessment;