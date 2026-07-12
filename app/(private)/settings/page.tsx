import { SeedSourceBtn } from "@/components/settings/SeedSource"
import { constructMetadata } from "@/lib/utils"

export const metadata = constructMetadata({
  title: "Settings - BlogDrop",
  description: "Manage your BlogDrop settings.",
  noIndex: true,
})

function SettingsPage() {
    return (
        <div className='max-w-4xl mx-auto'>

            <section className='w-full bg-accent p-4 rounded-xl'>
                <h3 className='text-xl font-semibold mb-4'>feed source</h3>
                <SeedSourceBtn />
            </section>

        </div>
    )
}

export default SettingsPage;
