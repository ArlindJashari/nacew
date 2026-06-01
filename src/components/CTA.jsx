import { useContext } from 'react';
import {
  BookOpen,
  Calendar,
  Crown,
  LayoutDashboard,
  ListFilter,
  MessageCircle,
  Play,
  Search,
} from 'lucide-react';
import { HeroTabContext } from './HeroTabContext';
import { Reveal, SectionShell } from './primitives';

const SIGNUP_URL = 'https://auth.nacew.com/signup';

const primaryButtonStyle = {
  '--border-bottom-width': '1px',
  '--border-color': 'var(--token-090acfc6-f7ee-4bf4-9b69-0b15cf2cb187, rgb(255, 243, 240))',
  '--border-left-width': '1px',
  '--border-right-width': '1px',
  '--border-style': 'solid',
  '--border-top-width': '1px',
  backdropFilter: 'none',
  backgroundColor: 'var(--token-792af9ed-53d8-45b2-94fd-014e7edc8f44, rgba(255, 255, 255, 0.8))',
  WebkitBackdropFilter: 'none',
  height: '100%',
  borderBottomLeftRadius: 768,
  borderBottomRightRadius: 768,
  borderTopLeftRadius: 768,
  borderTopRightRadius: 768,
};

const primaryButtonTextWrapStyle = {
  '--extracted-r6o4lv': 'var(--token-ef8ecd6d-5204-4f29-b3b7-2d4dc011513a, rgb(1, 16, 29))',
  '--framer-link-text-color': 'rgb(0, 153, 255)',
  '--framer-link-text-decoration': 'underline',
  transform: 'none',
};

const primaryButtonTextStyle = {
  '--framer-text-color': 'var(--extracted-r6o4lv, var(--token-ef8ecd6d-5204-4f29-b3b7-2d4dc011513a, rgb(1, 16, 29)))',
};

const mockIconStyle = {
  '--1m973uw': '#fff',
  '--js9iwy': 2,
};

const bottomLayerStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: -1,
  height: 'clamp(520px, 48vw, 900px)',
  zIndex: 8,
  opacity: 1,
  overflow: 'visible',
  pointerEvents: 'none',
  willChange: 'transform',
};

function PrimaryButton({ className = 'framer-4fy67c-container', label = 'Build your custom platform', href = SIGNUP_URL, fullWidth = false }) {
  return (
    <Reveal className={className} y={24}>
      <a
        className="framer-SDNRu framer-knjRQ framer-efr9v5 framer-v-efr9v5 framer-ces3t"
        data-border="true"
        data-framer-name="L Primary"
        data-highlight="true"
        href={href}
        rel="noopener"
        tabIndex={0}
        style={{ ...primaryButtonStyle, width: fullWidth ? '100%' : undefined }}
      >
        <div className="framer-ynqlit" data-framer-component-type="RichTextContainer" style={primaryButtonTextWrapStyle}>
          <p className="framer-text framer-styles-preset-1fhxhj6" data-styles-preset="O0790qsZT" dir="auto" style={primaryButtonTextStyle}>
            {label}
          </p>
        </div>
      </a>
    </Reveal>
  );
}

function MockIcon({ as: Icon, className }) {
  return <Icon className={className} aria-hidden="true" focusable="false" style={mockIconStyle} strokeWidth={2} />;
}

function AvatarImage({ className, src }) {
  return (
    <div className={className}>
      <div style={{ position: 'absolute', borderRadius: 'inherit', cornerShape: 'inherit', top: 0, right: 0, bottom: 0, left: 0 }} data-framer-background-image-wrapper="true">
        <img
          decoding="async"
          loading="lazy"
          width={1024}
          height={1024}
          sizes="(min-width: 1280px) 20px, (min-width: 810px) and (max-width: 1279.98px) 20px, (max-width: 809.98px) 20px"
          srcSet={`${src}?scale-down-to=512&width=1024&height=1024 512w,${src}?width=1024&height=1024 1024w`}
          src={`${src}?width=1024&height=1024`}
          alt=""
          style={{ display: 'block', width: '100%', height: '100%', borderRadius: 'inherit', cornerShape: 'inherit', objectPosition: 'center', objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}

function ChatMockup() {
  return (
    <div className="framer-i9bx2u hidden-k7b1cf">
      <div className="framer-wk89vv" data-border="true" data-framer-name="Chat UI">
        <div className="framer-9kb1aq">
          <div className="framer-laqesu">
            <div className="framer-16ztk4h" />
            <MockIcon as={Search} className="framer-In32S framer-1u07x1a" />
          </div>
          <div className="framer-iln6m1">
            <NavItem rowClass="framer-1nc93ia" icon={LayoutDashboard} iconClass="framer-cM5Rd framer-9w97zp" textClass="framer-1l42e70" label="Overview" />
            <NavItem rowClass="framer-oofvl1" icon={MessageCircle} iconClass="framer-uAULH framer-7krvq2" textClass="framer-s7jxig" label="Chat" />
            <NavItem rowClass="framer-ftwiow" icon={ListFilter} iconClass="framer-aRLS5 framer-7las7m" textClass="framer-1c452d4" label="Courses" />
            <NavItem rowClass="framer-yo82kk" icon={Calendar} iconClass="framer-vAXF2 framer-18tkzi4" textClass="framer-lhv40t" label="Events" />
            <NavItem rowClass="framer-1qdhft4" icon={BookOpen} iconClass="framer-mK2Z4 framer-1muba8o" textClass="framer-7j38e3" label="Members" />
            <NavItem rowClass="framer-eth4fj" icon={Crown} iconClass="framer-zvos8 framer-3bf2mg" textClass="framer-1ivct76" label="Leaderboard" />
          </div>
          <div className="framer-1ooau4h">
            <div className="framer-qw9cwz">
              <div className="framer-1g44yad" data-framer-component-type="RichTextContainer" style={{ transform: 'none' }}>
                <p className="framer-text framer-styles-preset-10qv886" data-styles-preset="dvE5DE7ca" dir="auto" style={{ '--framer-text-alignment': 'center' }}>
                  Courses
                </p>
              </div>
              <MockIcon as={Play} className="framer-ab47M framer-1fi1yy5" />
            </div>
            <div className="framer-1u24wuc" data-framer-name="Course 1" />
            <div className="framer-j8fu48" data-framer-name="Course 2" />
            <div className="framer-o9mi0s" data-framer-name="Course 3" />
            <div className="framer-pt2dp2" data-framer-name="Course 4" />
          </div>
        </div>
        <div className="framer-t90imi">
          <div className="framer-izj4da">
            <div className="framer-1gckil">
              <div className="framer-7yghsn" data-border="true" data-framer-name="1">
                <div className="framer-41q7rh" data-framer-component-type="RichTextContainer" style={{ transform: 'none' }}>
                  <p dir="auto" style={{ '--font-selector': 'SW50ZXItU2VtaUJvbGQ=', '--framer-font-weight': 600 }} className="framer-text">
                    S
                  </p>
                </div>
              </div>
              <div className="framer-1iai6xj" data-framer-name="1" data-framer-component-type="RichTextContainer" style={{ transform: 'none' }}>
                <p className="framer-text framer-styles-preset-prenqk" data-styles-preset="POYKcChXw" dir="auto" style={{ '--framer-text-alignment': 'center' }}>
                  <strong className="framer-text">Strong By Ava</strong>
                </p>
              </div>
              <div className="framer-fr7db8" data-framer-name="1">
                <div className="framer-1s1ds1c">
                  <AvatarImage className="framer-492t36" src="https://framerusercontent.com/images/J17st5pcaAXO9GWA5udu8FGf50.jpg" />
                  <AvatarImage className="framer-1bjlpaw" src="https://framerusercontent.com/images/MVRiYah2MhTCdKz3Q79AIXobIM.jpg" />
                  <AvatarImage className="framer-1gbpo34" src="https://framerusercontent.com/images/mO82b4q0xkPyk9UthT8GcXc2vf8.jpg" />
                </div>
                <div className="framer-1c3h0cv" data-framer-component-type="RichTextContainer" style={{ transform: 'none' }}>
                  <p className="framer-text framer-styles-preset-1fhxhj6" data-styles-preset="O0790qsZT" dir="auto" style={{ '--framer-text-alignment': 'center' }}>
                    847 members
                  </p>
                </div>
              </div>
            </div>
            <div className="ssr-variant">
              <MockJoinButton />
            </div>
            <div className="framer-1e9i6o" data-framer-name="1" data-framer-component-type="RichTextContainer" style={{ transform: 'none' }}>
              <p className="framer-text framer-styles-preset-10qv886" data-styles-preset="dvE5DE7ca" dir="auto" style={{ '--framer-text-alignment': 'left' }}>
                Ava Torres is a certified strength coach with 80k+ followers on Instagram. → 12-week progressive training programs with video lessons → Weekly live Q&amp;As and form-check threads → A supportive community of women training for strength
              </p>
            </div>
          </div>
          <div className="framer-1hivre4" />
        </div>
      </div>
    </div>
  );
}

function MockJoinButton() {
  return (
    <div className="framer-1xc3edc-container" data-framer-name="1" name="1">
      <a
        name="1"
        className="framer-SDNRu framer-knjRQ framer-efr9v5 framer-v-efr9v5 framer-ces3t"
        data-border="true"
        data-framer-name="L Primary"
        data-highlight="true"
        tabIndex={0}
        style={{ ...primaryButtonStyle, width: '100%' }}
      >
        <div className="framer-ynqlit" data-framer-component-type="RichTextContainer" style={primaryButtonTextWrapStyle}>
          <p className="framer-text framer-styles-preset-1fhxhj6" data-styles-preset="O0790qsZT" dir="auto" style={primaryButtonTextStyle}>
            Join now
          </p>
        </div>
      </a>
    </div>
  );
}

function NavItem({ rowClass, icon, iconClass, textClass, label }) {
  return (
    <div className={rowClass}>
      <MockIcon as={icon} className={iconClass} />
      <div className={textClass} data-framer-component-type="RichTextContainer" style={{ transform: 'none' }}>
        <p className="framer-text framer-styles-preset-1fhxhj6" data-styles-preset="O0790qsZT" dir="auto" style={{ '--framer-text-alignment': 'center' }}>
          {label}
        </p>
      </div>
    </div>
  );
}

function BottomLandscape() {
  const context = useContext(HeroTabContext);
  const activeTab = context ? context.activeTab : 0;
  const isGreen = activeTab === 2 || activeTab === 3;
  const isBlue = activeTab === 0;
  const isRed = activeTab === 1;

  return (
    <div
      className="framer-1p8lytk"
      data-framer-name="Sstfnco Minimalist_rolling_landscape_smooth_layered_hills_faint__523ac200-04ea-4fe0-8723-13074ad98f38"
      style={bottomLayerStyle}
    >
      <div style={{ position: 'absolute', left: '50%', bottom: 0, width: '100vw', minWidth: '100%', transform: 'translateX(-50%)', display: 'block' }}>
        <img decoding="async" loading="lazy" src="/hero/trees/x/light_blue.png" alt="" style={{ width: '100%', height: 'auto', display: 'block', transition: 'opacity 0.6s ease-in-out', opacity: 0 }} />
        <img decoding="async" loading="lazy" src="/hero/trees/x/green.png" alt="" style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 'auto', display: 'block', transition: 'opacity 0.6s ease-in-out', opacity: isGreen ? 1 : 0 }} />
        <img decoding="async" loading="lazy" src="/hero/trees/x/blue.png" alt="" style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 'auto', display: 'block', transition: 'opacity 0.6s ease-in-out', opacity: isBlue ? 1 : 0 }} />
        <img decoding="async" loading="lazy" src="/hero/trees/x/red.png" alt="" style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 'auto', display: 'block', transition: 'opacity 0.6s ease-in-out', opacity: isRed ? 1 : 0 }} />
      </div>
    </div>
  );
}

export default function CTA() {
  return (
    <SectionShell as="section" className="framer-aofqy9" data-border="true" data-framer-name="CTA">
      <div className="framer-1j2eboq" data-framer-name="container">
        <div className="framer-1sap953">
          <div className="framer-ososf" data-framer-name="lockup">
            <div className="framer-122k8zd">
              <div className="framer-1rx3f4p">
                <Reveal className="framer-jq8apq" data-framer-component-type="RichTextContainer" y={24}>
                  <h2 className="framer-text framer-styles-preset-fahce0" data-styles-preset="nZtZfLTSW" dir="auto" style={{ '--framer-text-alignment': 'left' }}>
                    Your custom product is one step away.
                  </h2>
                </Reveal>
                <Reveal className="framer-moeaun" data-framer-component-type="RichTextContainer" y={24}>
                  <p className="framer-text framer-styles-preset-prenqk" data-styles-preset="POYKcChXw" dir="auto" style={{ '--framer-text-alignment': 'left' }}>
                    Stop adapting your business to subscription tools. Let Nacew design and build software that fits your workflow, your brand, and your future.
                  </p>
                </Reveal>
              </div>
              <div className="ssr-variant">
                <PrimaryButton />
              </div>
            </div>
          </div>
          <ChatMockup />
        </div>
        <BottomLandscape />
      </div>
    </SectionShell>
  );
}
