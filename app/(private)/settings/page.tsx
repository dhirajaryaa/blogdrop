import { SeedSourceBtn } from "@/components/settings/SeedSource"

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
