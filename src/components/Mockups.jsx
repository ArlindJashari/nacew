import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Icons using basic SVG
const Icons = {
  Search: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Chat: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Folder: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>,
  List: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  Users: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Bell: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Send: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>,
  Image: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
};

// Reusable Layout matching the screenshot exactly
const ChatAppLayout = ({ title, sidebarNav, sidebarFolders, children, bgImage, isActive }) => {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'inherit', overflow: 'hidden' }}>
      
      {/* Background Image filling the outer gray box, sharp, unblurred */}
      <motion.img 
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1.03 : 1.08 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        src={bgImage} 
        alt="bg" 
        style={{ 
          position: 'absolute', 
          top: '-2px',
          left: '-2px',
          right: '-2px',
          bottom: '-2px',
          width: 'calc(100% + 4px)', 
          height: 'calc(100% + 4px)', 
          objectFit: 'cover', 
          zIndex: 0,
          borderRadius: 'inherit'
        }} 
      />

      {/* Floating Glass UI Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.96, y: isActive ? 0 : 15 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ 
          position: 'relative', 
          width: '85%', 
          height: '85%', 
          borderRadius: '16px', 
          overflow: 'hidden',
          boxShadow: '0 24px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
          backgroundColor: 'rgba(30, 28, 27, 0.75)', 
          backdropFilter: 'blur(40px)', 
          WebkitBackdropFilter: 'blur(40px)',
          display: 'flex',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          zIndex: 10
        }}
      >
           {/* Sidebar */}
           <div style={{ 
             width: '220px', flexShrink: 0, 
             borderRight: '1px solid rgba(255,255,255,0.06)', 
             display: 'flex', flexDirection: 'column', 
             padding: '24px 16px',
             background: 'linear-gradient(90deg, rgba(20,18,17,0.4) 0%, rgba(20,18,17,0.1) 100%)'
           }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', padding: '0 4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 22h20L12 2z"/></svg>
                  </div>
                  <span style={{ color: '#fff', fontSize: '14px', fontWeight: 600, letterSpacing: '-0.2px' }}>{title}</span>
                </div>
                <div style={{ color: '#888' }}><Icons.Search /></div>
              </div>

              {/* Nav */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {sidebarNav.map((item, i) => (
                  <div key={i} style={{ 
                    padding: '8px 10px', borderRadius: '8px', 
                    background: item.active ? 'rgba(255,255,255,0.06)' : 'transparent', 
                    color: item.active ? '#fff' : '#9CA3AF', 
                    fontSize: '13px', fontWeight: item.active ? 500 : 400,
                    display: 'flex', alignItems: 'center', gap: '12px',
                    cursor: 'pointer', transition: 'all 0.2s'
                  }}>
                     {item.icon}
                     {item.label}
                  </div>
                ))}
              </div>
              
              <div style={{ 
                marginTop: '32px', marginBottom: '8px', padding: '0 10px', 
                color: '#6B7280', fontSize: '11px', fontWeight: 600, letterSpacing: '0.5px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <span>FOLDERS</span>
                <span style={{ fontSize: '14px', fontWeight: 400 }}>+</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {sidebarFolders.map((item, i) => (
                  <div key={i} style={{ 
                    padding: '8px 10px', borderRadius: '8px', 
                    color: '#9CA3AF', fontSize: '13px', 
                    display: 'flex', alignItems: 'center', gap: '12px'
                  }}>
                     <Icons.Folder />
                     {item}
                  </div>
                ))}
              </div>
           </div>

           {/* Main Content Area */}
           <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
             {/* Top Nav right */}
             <div style={{ position: 'absolute', top: '24px', right: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
               <div style={{ color: '#888' }}><Icons.Bell /></div>
               <div style={{ background: '#2D88FF', color: '#fff', fontSize: '13px', fontWeight: 500, padding: '6px 14px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                 Invite
               </div>
               <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#444', overflow: 'hidden' }}>
                 <img src="https://i.pravatar.cc/100?img=11" alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
               </div>
             </div>

             {/* Chat Thread */}
             <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', gap: '32px', overflowY: 'auto', paddingTop: '80px' }}>
               {children}
             </div>
           </div>
      </motion.div>
    </div>
  );
};

const ChatBubble = ({ name, avatar, text, isReply, children, delay = 0, isActive }) => (
  <motion.div 
    initial={{ opacity: 0, y: 15 }}
    animate={isActive ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    style={{ 
      display: 'flex', flexDirection: 'column', gap: '12px',
      maxWidth: '500px', alignSelf: isReply ? 'center' : 'flex-start',
      marginLeft: isReply ? '10%' : '0'
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <img src={avatar} alt={name} style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
      <span style={{ color: '#E5E7EB', fontSize: '13px', fontWeight: 500 }}>{name}</span>
    </div>
    
    <div style={{ 
      background: isReply ? 'rgba(50, 48, 47, 0.8)' : 'transparent',
      padding: isReply ? '16px 20px' : '0 36px',
      borderRadius: isReply ? '12px' : '0',
      color: '#D1D5DB', fontSize: '14px', lineHeight: '1.6',
      border: isReply ? '1px solid rgba(255,255,255,0.03)' : 'none'
    }}>
      {text}
      {children}
    </div>
  </motion.div>
);

const ChatInput = ({ placeholder, delay = 0, isActive }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={isActive ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    style={{ 
      background: 'rgba(35, 33, 32, 0.8)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '16px', padding: '16px',
      display: 'flex', flexDirection: 'column', gap: '16px',
      width: '100%', maxWidth: '500px', alignSelf: 'center',
      marginTop: 'auto'
    }}
  >
    <div style={{ color: '#6B7280', fontSize: '14px' }}>{placeholder}</div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '12px', color: '#6B7280' }}>
        <Icons.Image />
        <Icons.List />
      </div>
      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#2D88FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <Icons.Send />
      </div>
    </div>
  </motion.div>
);

// --- Individual Mockups ---

export const CrmMockup = ({ isActive }) => {
  return (
    <ChatAppLayout 
      isActive={isActive}
      title="Nacew CRM"
      bgImage="/images/nacew_surreal_crm_1780003183194.png"
      sidebarNav={[
        { label: "Pipeline", icon: <Icons.Chat />, active: true },
        { label: "Contacts", icon: <Icons.List /> },
        { label: "Reports", icon: <Icons.Users /> }
      ]}
      sidebarFolders={["Enterprise Deals", "Startups", "Lost Deals"]}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 600, margin: 0 }}>Active Deals</h3>
        <div style={{ background: '#2D88FF', color: '#fff', fontSize: '13px', fontWeight: 500, padding: '8px 16px', borderRadius: '8px' }}>+ New Deal</div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[
          { company: 'Acme Corp', value: '$120,000', stage: 'Negotiation', color: '#3B82F6' },
          { company: 'Globex Inc', value: '$85,000', stage: 'Closed Won', color: '#10B981' },
          { company: 'Initech', value: '$45,000', stage: 'Discovery', color: '#8B5CF6' },
          { company: 'Stark Ind', value: '$250,000', stage: 'Proposal', color: '#F59E0B' }
        ].map((deal, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + (i * 0.1), ease: "easeOut" }}
            style={{ 
              background: 'rgba(35, 33, 32, 0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ color: '#F3F4F6', fontSize: '14px', fontWeight: 500 }}>{deal.company}</span>
              <span style={{ color: '#9CA3AF', fontSize: '12px' }}>B2B Software</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <span style={{ color: '#fff', fontSize: '15px', fontWeight: 600 }}>{deal.value}</span>
              <span style={{ background: `${deal.color}15`, color: deal.color, padding: '4px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 600, minWidth: '80px', textAlign: 'center' }}>{deal.stage}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </ChatAppLayout>
  );
};

export const InternalToolsMockup = ({ isActive }) => {
  return (
    <ChatAppLayout 
      isActive={isActive}
      title="Internal OS"
      bgImage="/images/new/ChatGPT Image May 28, 2026, 11_36_53 PM (5).png"
      sidebarNav={[
        { label: "Approvals", icon: <Icons.Chat />, active: true },
        { label: "Expenses", icon: <Icons.List /> },
        { label: "Directory", icon: <Icons.Users /> }
      ]}
      sidebarFolders={["Engineering", "Marketing", "HR"]}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 600, margin: 0 }}>Pending Approvals</h3>
      </div>
      
      <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#6B7280', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
          <span>Request</span>
          <span>Department</span>
          <span>Amount</span>
          <span>Status</span>
        </div>
        {[
          { name: 'Q3 AWS Hosting', dept: 'Engineering', amount: '$12,450', status: 'Pending', color: '#F59E0B' },
          { name: 'Adobe CC Licenses', dept: 'Design', amount: '$1,200', status: 'Approved', color: '#10B981' },
          { name: 'Salesforce Renewal', dept: 'Sales', amount: '$45,000', status: 'Denied', color: '#EF4444' },
          { name: 'Team Offsite', dept: 'HR', amount: '$8,500', status: 'Pending', color: '#F59E0B' }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={isActive ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
            style={{ 
              display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '16px 0', borderBottom: i !== 3 ? '1px solid rgba(255,255,255,0.03)' : 'none', color: '#D1D5DB', fontSize: '13px', alignItems: 'center'
            }}
          >
            <span style={{ color: '#fff', fontWeight: 500 }}>{item.name}</span>
            <span style={{ color: '#9CA3AF' }}>{item.dept}</span>
            <span style={{ color: '#E5E7EB' }}>{item.amount}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.color }}></div>
              <span style={{ color: item.color, fontWeight: 500 }}>{item.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </ChatAppLayout>
  );
};

export const AppsMockup = ({ isActive }) => {
  return (
    <ChatAppLayout 
      isActive={isActive}
      title="App Builder"
      bgImage="/images/new/ChatGPT Image May 28, 2026, 11_36_54 PM (8).png"
      sidebarNav={[
        { label: "Deployments", icon: <Icons.Chat />, active: true },
        { label: "Design", icon: <Icons.List /> },
        { label: "Analytics", icon: <Icons.Users /> }
      ]}
      sidebarFolders={["iOS App", "Web Dashboard", "API"]}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 600, margin: 0 }}>App Performance</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '12px', padding: '6px 12px', borderRadius: '6px' }}>7 Days</div>
          <div style={{ background: 'rgba(255,255,255,0.05)', color: '#9CA3AF', fontSize: '12px', padding: '6px 12px', borderRadius: '6px' }}>30 Days</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Active Users', value: '42.5K', trend: '+12%' },
          { label: 'Avg Session', value: '4m 32s', trend: '+5%' },
          { label: 'Crash Rate', value: '0.01%', trend: '-2%' }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isActive ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 + (i * 0.1), ease: "easeOut" }}
            style={{ 
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px'
            }}
          >
            <span style={{ color: '#9CA3AF', fontSize: '13px' }}>{stat.label}</span>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
              <span style={{ color: '#fff', fontSize: '28px', fontWeight: 600, lineHeight: 1 }}>{stat.value}</span>
              <span style={{ color: stat.trend.includes('+') ? '#10B981' : '#3B82F6', fontSize: '13px', fontWeight: 500, marginBottom: '2px' }}>{stat.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        style={{ flex: 1, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        <span style={{ color: '#9CA3AF', fontSize: '13px' }}>User Growth (Mock Chart)</span>
        <div style={{ flex: 1, borderBottom: '1px solid rgba(255,255,255,0.1)', position: 'relative', display: 'flex', alignItems: 'flex-end', gap: '16px', paddingTop: '40px' }}>
          {[30, 45, 35, 60, 50, 80, 95].map((h, i) => (
             <motion.div key={i} initial={{ height: 0 }} animate={isActive ? { height: `${h}%` } : {}} transition={{ duration: 0.8, delay: 0.5 + (i * 0.05) }} style={{ flex: 1, background: '#2D88FF', borderRadius: '4px 4px 0 0', opacity: 0.8 }} />
          ))}
        </div>
      </motion.div>
    </ChatAppLayout>
  );
};

export const AutomationsMockup = ({ isActive }) => {
  return (
    <ChatAppLayout 
      isActive={isActive}
      title="FlowBot"
      bgImage="/images/new/ChatGPT Image May 28, 2026, 11_36_53 PM (3).png"
      sidebarNav={[
        { label: "Workflows", icon: <Icons.Chat />, active: true },
        { label: "Integrations", icon: <Icons.List /> },
        { label: "Logs", icon: <Icons.Users /> }
      ]}
      sidebarFolders={["Payments", "Onboarding", "Sync"]}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 600, margin: 0 }}>Payment Recovery Flow</h3>
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', fontSize: '12px', fontWeight: 600, padding: '6px 12px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '6px', height: '6px', background: '#10B981', borderRadius: '50%' }}></div>
          Active
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        {/* Connection Lines */}
        <div style={{ position: 'absolute', width: '2px', height: '100%', background: 'rgba(255,255,255,0.05)', zIndex: 1 }}></div>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          style={{ background: 'rgba(35, 33, 32, 0.9)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px', width: '280px', display: 'flex', gap: '16px', alignItems: 'center', zIndex: 2, marginBottom: '32px' }}
        >
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(139, 92, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B5CF6' }}><Icons.Bell /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}>Webhook Trigger</span>
            <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Stripe payment_failed</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          style={{ background: 'rgba(35, 33, 32, 0.9)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px', width: '280px', display: 'flex', gap: '16px', alignItems: 'center', zIndex: 2, marginBottom: '32px' }}
        >
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B' }}><Icons.List /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}>Condition Check</span>
            <span style={{ color: '#9CA3AF', fontSize: '12px' }}>If user is enterprise = true</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          style={{ background: 'rgba(35, 33, 32, 0.9)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px', width: '280px', display: 'flex', gap: '16px', alignItems: 'center', zIndex: 2 }}
        >
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(45, 136, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2D88FF' }}><Icons.Send /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}>Send Action</span>
            <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Email account manager</span>
          </div>
        </motion.div>
      </div>
    </ChatAppLayout>
  );
};
