import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { githubProfile } from "@/config/constant";
import { IconArrowUpRight } from "@tabler/icons-react";

function FounderNote() {
  return (
    <section className="border-border/70 mt-24 border-t py-20 sm:mt-32 sm:py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.5fr]">
        <div>
          <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
            A note from the builder
          </p>
        </div>

        <div className="max-w-3xl">
          <h2 className="text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl">
            I built BlogDrop because{" "}
            <span className="text-muted-foreground">
              great engineering writing shouldn&apos;t be so hard to find.
            </span>
          </h2>

          <div className="text-muted-foreground mt-8 max-w-2xl space-y-5 text-sm leading-7">
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
              So I started building BlogDrop for myself. Now I&apos;m making it
              useful for anyone who enjoys learning from people who actually
              build.
            </p>
          </div>

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
                className="group text-foreground flex items-center gap-1 text-sm font-medium"
              >
                Dhiraj Arya <IconArrowUpRight stroke={2} size={14} />
              </a>
              <p className="text-muted-foreground text-xs">
                self-taught engineer, builder, and writer.
              </p>
            </div>
          </div>

          <a
            href="mailto:hello@blogdrop.in"
            className="text-foreground hover:text-muted-foreground mt-8 inline-flex items-center gap-1 text-sm font-medium transition-colors"
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