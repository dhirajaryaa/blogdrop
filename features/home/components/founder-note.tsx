import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { githubProfile } from "@/config/constant";
import { IconArrowUpRight } from "@tabler/icons-react";

function FounderNote() {
  return (
    <section className="border-muted-foreground mt-20 border-t py-24">
      <div className="mx-auto grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.5fr]">
        {/* Label */}
        <div>
          <p className="text-muted-foreground text-xs font-medium tracking-[0.18em] uppercase">
            A note from the builder
          </p>
        </div>

        {/* Content */}
        <div className="max-w-3xl">
          <h2 className="text-foreground text-3xl leading-tight font-semibold tracking-[-0.03em] sm:text-4xl">
            I built BlogDrop because <br />
            <span className="text-foreground/60">
              great engineering writing shouldn't be so hard to find.
            </span>
          </h2>

          <div className="mt-8 max-w-2xl space-y-5 text-sm leading-7 text-neutral-600">
            <p>
              There are thousands of engineering blogs, case studies, and
              technical write-ups published every year. The good ones are often
              scattered across the internet and easy to miss.
            </p>

            <p>
              I wanted a quieter place to discover how real teams build things —
              the decisions they make, the problems they solve, and the lessons
              they learn along the way.
            </p>

            <p>
              So I started building BlogDrop for myself. Now I'm making it
              useful for anyone who enjoys learning from people who actually
              build.
            </p>
          </div>

          {/* Signature */}
          <div className="mt-10 flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/founder.webp" />
              <AvatarFallback>DA</AvatarFallback>
            </Avatar>

            <div>
              <a
                href={githubProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1 text-sm font-medium text-neutral-900"
              >
                Dhiraj Arya <IconArrowUpRight stroke={2} size={14} />
              </a>
              <p className="text-muted-foreground text-xs">
                self-taught engineer, builder, and writer.
              </p>
            </div>
          </div>

          {/* Small CTA */}
          <a
            href="mailto:hello@blogdrop.in"
            className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-neutral-900 transition-colors hover:text-neutral-500"
          >
            Say hello
            <IconArrowUpRight stroke={2} size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default FounderNote;
