import { ComingSoon } from "@/components/common/coming-soon";
import { SectionHeader } from "@/components/common/section-header";
import { constructMetadata } from "@/lib/utils"

export const metadata = constructMetadata({
  title: "Settings - BlogDrop",
  description: "Manage your BlogDrop settings.",
  noIndex: true,
})

function SettingsPage() {
    return (
       <>
             <SectionHeader title="Settings" description="Manage your BlogDrop settings.">
              
                 <ComingSoon />
               
             </SectionHeader>
           </>


    )
}

export default SettingsPage;
