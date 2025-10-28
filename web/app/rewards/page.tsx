import { getRewards } from '@/lib/sanity.client';

export const revalidate = 60;

export default async function RewardsPage() {
  const rewards = await getRewards();
  return (
    <div className="card" style={{maxWidth:600,margin:'40px auto',padding:'32px 24px'}}>
      <h1 style={{marginTop:0, marginBottom:'12px', color: 'var(--fg)'}}>Rewards</h1>
      <p style={{margin:'0 0 24px 0', color: 'var(--fg)'}}>{rewards?.description || 'Check out our rewards program below.'}</p>
      {rewards?.rewardsPdfUrl && (
        <div style={{marginTop:'16px', width:'100%', minHeight:'480px', borderRadius:'12px', overflow:'hidden', boxShadow:'0 2px 16px rgba(0,0,0,0.08)'}}>
          <iframe
            src={rewards.rewardsPdfUrl}
            title="Rewards PDF"
            width="100%"
            height="600"
            style={{border:'none', borderRadius:'12px', minHeight:'480px', background:'#fff'}}
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
