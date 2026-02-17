import React, { useState, useEffect, useRef } from 'react';
import { 
  Code2, 
  Rocket, 
  Instagram, 
  Terminal, 
  Globe, 
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Network,
  Award,
  QrCode,
  FileText,
  BrainCircuit,
  Database,
  ArrowUpRight,
  Users
} from 'lucide-react';

// Interfaces consolidadas
interface Pillar {
  title: string;
  tags?: string[];
  icon: React.ReactNode;
  description: string;
}

interface Benefit {
  title: string;
  description: string;
  icon: React.ReactNode;
}

// CONFIGURAÇÃO DE LINKS
const FORM_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSeZ2UmdlfKeoKIElbvRXzWoC8SapTFqyOMcanWqU1w_XmAIRA/viewform?usp=header";
const INSTAGRAM_LINK = "https://www.instagram.com/laftecuninassau?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
const EDITAL_LINK = "https://drive.google.com/file/d/1QksH8xoE1tSWz-cJkPW2XTAVMSDPyHJk/view?usp=sharing"; 

const useElementInView = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [elementRef, isVisible] as const;
};

const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center space-x-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-1.5 mb-6">
    <Sparkles size={14} className="text-yellow-400" />
    <span className="text-yellow-400 text-[10px] font-black uppercase tracking-widest">{children}</span>
  </span>
);

const SectionTitle: React.FC<{ children: React.ReactNode; subtitle?: string }> = ({ children, subtitle }) => (
  <div className="mb-12">
    <h2 className="text-4xl md:text-5xl font-black uppercase italic mb-4 leading-none">
      <span className="text-yellow-400">/</span> {children}
    </h2>
    {subtitle && <p className="text-gray-400 font-mono text-sm uppercase tracking-wider">{subtitle}</p>}
  </div>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Pilares', href: '#fazemos' },
    { name: 'Benefícios', href: '#beneficios' },
    { name: 'Inscrição', href: '#inscricao' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = elem.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/95 backdrop-blur-xl py-3 border-b border-yellow-400/20' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="bg-yellow-400 p-1.5 rounded-lg group-hover:scale-110 transition-transform duration-300">
            <Terminal size={20} className="text-black" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white uppercase italic text-shadow">LAFTEC</span>
        </div>

        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-[10px] font-black text-gray-400 hover:text-yellow-400 transition-colors uppercase tracking-[0.2em]"
            >
              {link.name}
            </a>
          ))}
          <a href={FORM_LINK} target="_blank" rel="noopener noreferrer" className="bg-yellow-400 text-black px-6 py-2 rounded-full font-black text-xs hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(250,204,21,0.2)]">
            QUERO PARTICIPAR
          </a>
        </div>

        <button 
          className="md:hidden text-white p-2" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-0 top-0 h-screen bg-black z-40 py-24 px-8 flex flex-col space-y-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-5xl font-black border-l-8 border-transparent pl-4 hover:border-yellow-400 transition-all uppercase italic"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC = () => (
  <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-black">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(250,204,21,0.15),transparent_60%)]"></div>
    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-4xl">
        <Badge>Conexão Calouros 2026</Badge>
        <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-8 italic uppercase">
          Conectando <br />
          <span className="text-yellow-400">Mulheres</span> <br />
          ao Futuro.
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 font-medium leading-relaxed border-l-2 border-yellow-400/30 pl-6">
          A LAFTEC é a sua comunidade de tecnologia na faculdade. Aqui, transformamos curiosidade em código, protagonismo em carreira e calouras em líderes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href={FORM_LINK} target="_blank" rel="noopener noreferrer" className="bg-yellow-400 text-black px-10 py-5 rounded-full font-black text-lg flex items-center justify-center space-x-3 hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(250,204,21,0.3)]">
            <span>QUERO FAZER PARTE</span>
            <ArrowRight size={24} />
          </a>
          <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="border border-white/20 text-white px-10 py-5 rounded-full font-black text-lg flex items-center justify-center hover:bg-white/5 transition-all">
            CONHECER A LIGA
          </a>
        </div>
      </div>
    </div>
  </section>
);

const About: React.FC = () => (
  <section id="sobre" className="py-24 bg-zinc-950">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row gap-16 items-center">
        <div className="md:w-1/2">
          <SectionTitle subtitle="// mission_statement.txt">Sobre a LAFTEC</SectionTitle>
          <p className="text-gray-400 text-xl leading-relaxed mb-8">
            A <span className="text-white font-bold">Liga Acadêmica Feminina de Tecnologia</span> nasceu para quebrar barreiras. Somos um espaço seguro e focado no crescimento de mulheres que querem dominar a tecnologia, promovendo comunidade, desenvolvimento técnico e impacto social real.
          </p>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="mt-1 text-yellow-400"><Rocket size={20} /></div>
              <div>
                <h4 className="text-white font-black uppercase text-sm italic">Nosso Propósito</h4>
                <p className="text-gray-500 text-sm">Garantir que cada mulher tenha as ferramentas para liderar na era digital.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="mt-1 text-yellow-400"><Users size={20} /></div>
              <div>
                <h4 className="text-white font-black uppercase text-sm italic">Nossa Comunidade</h4>
                <p className="text-gray-500 text-sm">Uma rede de apoio que vai muito além das salas de aula.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="bg-yellow-400 aspect-video rounded-3xl flex items-center justify-center rotate-3 scale-95 opacity-50 absolute inset-0"></div>
          <div className="bg-zinc-900 border border-white/10 aspect-video rounded-3xl relative z-10 flex flex-col overflow-hidden">
            <div className="h-8 bg-zinc-800 flex items-center px-4 space-x-2 border-b border-white/5">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            <div className="p-8 font-mono text-sm text-yellow-400 space-y-2">
              <p className="text-gray-500"># Iniciando sistema LAFTEC...</p>
              <p>&gt; loading_women_empowerment.js</p>
              <p>&gt; connecting_to_innovation...</p>
              <p className="text-white mt-4 italic">// Junte-se a nós e escreva o seu futuro.</p>
              <div className="pt-4 flex animate-pulse">
                <div className="w-2 h-5 bg-yellow-400"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const WhatWeDo: React.FC = () => {
  const pillars: Pillar[] = [
    {
      title: "Ensino",
      description: "Aulas práticas de robótica, workshops técnicos e nivelamento de inglês para o mercado tech.",
      icon: <BrainCircuit className="text-black" />,
      tags: ["Robótica", "Inglês", "Mentorias"]
    },
    {
      title: "Extensão",
      description: "Projetos reais com dados, visitas técnicas a empresas (Tech Tours) e organização de eventos.",
      icon: <Database className="text-black" />,
      tags: ["Data Science", "Networking", "Eventos"]
    },
    {
      title: "Pesquisa",
      description: "Desenvolvimento de tecnologias assistivas e projetos com alto impacto social.",
      icon: <Globe className="text-black" />,
      tags: ["Impacto Social", "Pesquisa UX", "Inovação"]
    }
  ];

  return (
    <section id="fazemos" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <SectionTitle subtitle="// logic_structure.sys">O que fazemos</SectionTitle>
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((p, i) => (
            <div key={i} className="group bg-zinc-900/50 p-8 rounded-[40px] border border-white/5 hover:border-yellow-400/50 transition-all duration-500">
              <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform">
                {p.icon}
              </div>
              <h3 className="text-3xl font-black uppercase italic mb-4">{p.title}</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">{p.description}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags?.map(tag => (
                  <span key={tag} className="text-[10px] font-black uppercase tracking-widest border border-yellow-400/30 text-yellow-400 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BenefitCard: React.FC<{ b: Benefit; index: number }> = ({ b, index }) => {
  const [ref, isVisible] = useElementInView({ threshold: 0.1 });

  return (
    <div 
      ref={ref}
      style={{ 
        transitionDelay: `${index * 100}ms`,
        transitionDuration: '800ms'
      }}
      className={`flex space-x-6 p-6 rounded-3xl bg-black border border-white/5 hover:bg-zinc-900 transition-all transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="text-yellow-400 shrink-0">{b.icon}</div>
      <div>
        <h4 className="text-white font-black uppercase text-sm mb-2">{b.title}</h4>
        <p className="text-gray-500 text-xs leading-relaxed">{b.description}</p>
      </div>
    </div>
  );
};

const Benefits: React.FC = () => {
  const list: Benefit[] = [
    { title: "Comunidade e Apoio", description: "Ambiente acolhedor para tirar dúvidas e crescer juntas.", icon: <Users /> },
    { title: "Desenvolvimento Técnico", description: "Acesso a cursos e ferramentas exclusivas da liga.", icon: <Code2 /> },
    { title: "Experiência Curricular", description: "Certificados de extensão e projetos reais no portfólio.", icon: <Award /> },
    { title: "Networking Estratégico", description: "Contato direto com profissionais e empresas da área.", icon: <Network /> },
    { title: "Protagonismo Feminino", description: "Oportunidades reais de liderança e gestão de projetos.", icon: <Sparkles /> }
  ];

  return (
    <section id="beneficios" className="py-24 bg-zinc-950 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3">
            <SectionTitle subtitle="// upgrade_your_skills.bin">Por que participar?</SectionTitle>
            <p className="text-gray-500 font-medium">Não é apenas sobre aprender a programar, é sobre se tornar a profissional que o futuro exige.</p>
          </div>
          <div className="md:w-2/3 grid sm:grid-cols-2 gap-8">
            {list.map((b, i) => (
              <BenefitCard key={i} b={b} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Recruitment: React.FC = () => (
  <section id="inscricao" className="py-24 bg-black relative overflow-hidden">
    <div className="absolute inset-0 bg-yellow-400/5 blur-[120px] rounded-full -translate-y-1/2"></div>
    <div className="container mx-auto px-6 relative z-10">
      <div className="bg-yellow-400 p-8 md:p-16 rounded-[60px] flex flex-col items-center text-center">
        <Badge>Processo Seletivo 2026.1</Badge>
        <h2 className="text-5xl md:text-7xl font-black text-black italic uppercase leading-[0.85] tracking-tighter mb-8">
          A Próxima Geração <br /> Começa com Você.
        </h2>
        <p className="text-black/70 text-base md:text-lg max-w-2xl font-bold mb-12">
          Sua trajetória na tecnologia começa aqui. Escaneie o QR Code ou clique no botão para garantir sua vaga.
        </p>
        
        {/* Container Restaurado para largura normal (max-w-4xl) */}
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl text-left items-stretch">
          {/* Card da Inscrição - Restaurado para proporção equilibrada */}
          <div className="bg-black/10 backdrop-blur-md p-8 md:p-10 rounded-[40px] border border-black/10 flex flex-col items-center group hover:bg-black/20 transition-all">
            <h4 className="text-black font-black uppercase text-2xl mb-8 flex items-center space-x-2">
              <QrCode size={24} /> <span>Inscrição</span>
            </h4>
            
            <div className="flex flex-col items-center w-full space-y-8 flex-grow justify-center">
              {/* QR CODE - Mantido na Paleta e Compacto */}
              <div className="bg-black p-2 rounded-xl shadow-lg border border-yellow-400/20">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(FORM_LINK)}&color=facc15&bgcolor=000000`} 
                  alt="QR Code Inscrição"
                  className="w-[80px] h-[80px] block"
                />
              </div>
              
              <a 
                href={FORM_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-black text-yellow-400 py-5 rounded-full font-black text-sm flex items-center justify-center space-x-2 hover:scale-105 transition-transform shadow-xl border border-yellow-400/10"
              >
                <span>INSCREVA-SE AGORA</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* Card do Edital - Restaurado para proporção equilibrada */}
          <div className="bg-black/10 backdrop-blur-md p-8 md:p-10 rounded-[40px] border border-black/10 flex flex-col justify-between">
            <div className="flex flex-col h-full">
              <h4 className="text-black font-black uppercase text-2xl mb-8 flex items-center space-x-2">
                <FileText size={24} /> <span>O Edital</span>
              </h4>
              <p className="text-black/70 font-bold mb-10 text-sm leading-relaxed flex-grow">
                Consulte o documento oficial para entender todas as etapas do processo, prazos importantes e os requisitos para se tornar uma ligante da LAFTEC 2026.1.
              </p>
              
              <a 
                href={EDITAL_LINK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-black text-white py-5 rounded-full font-black text-sm flex items-center justify-center space-x-3 hover:scale-105 transition-all shadow-xl"
              >
                <span>ACESSAR EDITAL</span>
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 flex items-center space-x-4 text-black/40 font-black uppercase text-[10px] tracking-[0.3em]">
          <span className="w-12 h-[1px] bg-black/20"></span>
          <span>Inscrições abertas até 03 de Março</span>
          <span className="w-12 h-[1px] bg-black/20"></span>
        </div>
      </div>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="py-12 bg-black border-t border-white/5">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
        <div className="flex items-center space-x-4">
          <div className="bg-yellow-400 p-2 rounded-lg">
            <Terminal size={24} className="text-black" />
          </div>
          <span className="text-3xl font-black italic tracking-tighter uppercase">LAFTEC</span>
        </div>
        <div className="flex space-x-6">
          <a 
            href={INSTAGRAM_LINK} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-3 bg-zinc-900 rounded-full hover:bg-yellow-400 hover:text-black transition-all"
            aria-label="Instagram da LAFTEC"
          >
            <Instagram size={24} />
          </a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 font-black uppercase tracking-[0.3em]">
        <p>© 2026 LAFTEC - Liga Acadêmica Feminina de Tecnologia</p>
        <p className="mt-4 md:mt-0 italic">Designed for the future_</p>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-400 selection:text-black font-sans">
      <Navbar />
      <Hero />
      <About />
      <WhatWeDo />
      <Benefits />
      <Recruitment />
      <Footer />
    </div>
  );
};

export default App;