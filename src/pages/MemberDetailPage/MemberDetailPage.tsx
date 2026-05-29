import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Award, Download } from 'lucide-react'
import { getMemberById } from '../../data/members'
import AnimatedSection from '../../components/AnimatedSection'

export default function MemberDetailPage() {
  const { id } = useParams<{ id: string }>()
  const member = getMemberById(id || '')

  if (!member) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">成员未找到</h2>
          <Link to="/membership" className="text-[hsl(50_100%_70%)] hover:underline">
            返回成员中心
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          to="/membership"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[hsl(50_100%_70%)] transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          返回会员中心
        </Link>
      </div>

      {/* Member Card */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="glass-card rounded-2xl p-8 md:p-12">
              {/* Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-xl bg-[hsl(50_100%_70%_/0.1)] border border-[hsl(50_100%_70%_/0.3)] flex items-center justify-center flex-shrink-0">
                  <Award className="w-10 h-10 text-[hsl(50_100%_70%)]" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">{member.name}</h1>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        member.level === 'founding-org'
                          ? 'bg-[hsl(50_100%_70%_/0.15)] text-[hsl(50_100%_70%)] border border-[hsl(50_100%_70%_/0.3)]'
                          : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                      }`}
                    >
                      {member.level === 'founding-org' ? '创始会员单位' : '创始会员先锋'}
                    </span>
                  </div>
                  <p className="text-gray-400">{member.description}</p>
                </div>
              </div>

              {/* Member No Badge - Shiny Gold */}
              <style>{`
                @keyframes memberBadgeShimmer {
                  0% { background-position: -200% center; }
                  100% { background-position: 200% center; }
                }
                @keyframes memberBadgeGlow {
                  0%, 100% { box-shadow: 0 0 8px hsl(50 100% 70% / 0.2), 0 0 20px hsl(50 100% 70% / 0.1); }
                  50% { box-shadow: 0 0 16px hsl(50 100% 70% / 0.4), 0 0 40px hsl(50 100% 70% / 0.2); }
                }
                .member-badge-shiny {
                  background: linear-gradient(
                    110deg,
                    hsl(50 100% 70% / 0.08) 0%,
                    hsl(50 100% 70% / 0.15) 40%,
                    hsl(50 100% 85% / 0.25) 50%,
                    hsl(50 100% 70% / 0.15) 60%,
                    hsl(50 100% 70% / 0.08) 100%
                  );
                  background-size: 200% 100%;
                  animation: memberBadgeShimmer 3s ease-in-out infinite, memberBadgeGlow 2.5s ease-in-out infinite;
                  border-image: linear-gradient(135deg, hsl(50 100% 70% / 0.5), hsl(50 100% 85% / 0.8), hsl(50 100% 70% / 0.5)) 1;
                }
              `}</style>
              <div className="member-badge-shiny inline-flex items-center gap-3 px-6 py-3.5 mb-8 rounded-xl border border-[hsl(50_100%_70%_/0.4)] backdrop-blur-sm">
                <span className="text-sm font-medium text-white/80 tracking-wide">会员编号：</span>
                <span className="text-2xl font-bold text-[hsl(50_100%_70%)] tracking-[0.2em]" style={{ textShadow: '0 0 12px hsl(50 100% 70% / 0.5), 0 0 24px hsl(50 100% 70% / 0.2)' }}>{member.memberNo}</span>
              </div>

              {/* Full Description */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-white mb-3">详细介绍</h2>
                <div className="space-y-4">
                  {member.fullDescription.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-gray-400 leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Certificate Download */}
              {member.certificateNo && (
                <div className="p-6 rounded-xl bg-[hsl(50_100%_70%_/0.05)] border border-[hsl(50_100%_70%_/0.2)]">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[hsl(50_100%_70%_/0.1)] border border-[hsl(50_100%_70%_/0.2)] flex items-center justify-center">
                        <Award className="w-5 h-5 text-[hsl(50_100%_70%)]" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">电子证书</h3>
                      </div>
                    </div>
                    <a
                      href={import.meta.env.BASE_URL + `certificates/${member.id}.pdf`}
                      download={`${member.name}_CGIA证书.pdf`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[hsl(50_100%_70%_/0.1)] border border-[hsl(50_100%_70%_/0.3)] text-[hsl(50_100%_70%)] text-sm font-medium hover:bg-[hsl(50_100%_70%_/0.2)] transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      下载证书
                    </a>
                  </div>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
