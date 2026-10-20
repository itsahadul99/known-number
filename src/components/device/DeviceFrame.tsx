import React from 'react';
import { cn } from '@/lib/utils';

export type ChannelType = 'call-incoming' | 'call-active' | 'sms' | 'chat' | 'email' | 'popup';

export interface DeviceMessage {
  text: string;
  sender?: string;
  time?: string;
  isIncoming?: boolean;
}

interface DeviceFrameProps {
  channel: ChannelType;
  senderName: string;
  senderSubtitle?: string;
  caption: string;
  messages: DeviceMessage[];
  onAnswer?: () => void;
  onDecline?: () => void;
  callDuration?: string;
  className?: string;
}

export function DeviceFrame({
  channel,
  senderName,
  senderSubtitle,
  caption,
  messages,
  onAnswer,
  onDecline,
  callDuration = '00:42',
  className,
}: DeviceFrameProps) {
  return (
    <figure className={cn('my-4 w-full max-w-md mx-auto', className)}>
      {/* Outer Phone Shell */}
      <div className="bg-panel p-3 rounded-device border-2 border-ink shadow-sm">
        {/* Inner Phone Screen */}
        <div className="bg-device-screen rounded-[calc(2rem-0.75rem)] border-2 border-device-border overflow-hidden min-h-[340px] flex flex-col text-device-text font-sans">
          {/* Top Notch / Speaker Mockup */}
          <div className="h-6 bg-device-bg flex items-center justify-center border-b border-device-border">
            <div className="w-12 h-1 rounded bg-control-edge" />
          </div>

          {/* CHANNEL: Incoming Phone Call */}
          {channel === 'call-incoming' && (
            <div className="p-6 px-4 flex flex-col items-center justify-between flex-1 text-center bg-device-bg">
              <div className="flex flex-col items-center">
                <span className="text-xs text-device-text-muted uppercase tracking-wider font-semibold">
                  Incoming call
                </span>
                <h3 className="text-2xl font-bold mt-2 text-device-text">
                  {senderName}
                </h3>
                {senderSubtitle && (
                  <span className="text-base text-device-text-muted mt-1">
                    {senderSubtitle}
                  </span>
                )}
              </div>

              {/* Call ring pulse */}
              <div className="w-20 h-20 rounded-full bg-panel border-2 border-dashed border-control-edge flex items-center justify-center my-6">
                <span className="text-3xl" aria-hidden="true">☎</span>
              </div>

              {/* Answer / Decline controls */}
              <div className="flex w-full gap-4 justify-center">
                {onDecline && (
                  <button
                    type="button"
                    onClick={onDecline}
                    className="flex-1 bg-device-call-red text-white rounded-control min-h-[52px] font-bold cursor-pointer hover:opacity-90 active:scale-95 transition-all"
                  >
                    Decline
                  </button>
                )}
                {onAnswer && (
                  <button
                    type="button"
                    onClick={onAnswer}
                    className="flex-1 bg-device-call-green text-white rounded-control min-h-[52px] font-bold cursor-pointer hover:opacity-90 active:scale-95 transition-all"
                  >
                    Answer
                  </button>
                )}
              </div>
            </div>
          )}

          {/* CHANNEL: Active Phone Call */}
          {channel === 'call-active' && (
            <div className="flex flex-col flex-1 bg-device-bg">
              <div className="p-3 px-4 bg-panel border-b border-device-border text-center">
                <div className="font-bold text-lg text-ink">{senderName}</div>
                <div className="text-xs text-ink-muted">In call · {callDuration}</div>
              </div>

              <div className="p-4 flex-1 flex flex-col gap-3">
                <span className="text-xs uppercase text-ink-muted font-bold tracking-wider">
                  Live transcript:
                </span>
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className="bg-device-bubble-in text-device-bubble-in-text p-3 px-4 rounded-control text-base leading-relaxed border-l-4 border-control-edge"
                  >
                    &ldquo;{msg.text}&rdquo;
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CHANNEL: SMS / Text Message */}
          {channel === 'sms' && (
            <div className="flex flex-col flex-1 bg-device-bg">
              <div className="p-3 px-4 bg-panel border-b border-device-border flex items-center gap-2">
                <div className="font-bold text-base text-ink">{senderName}</div>
                {senderSubtitle && (
                  <span className="text-xs text-ink-muted">({senderSubtitle})</span>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col gap-3">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      'p-3 px-4 rounded-panel max-w-[85%] text-base leading-relaxed',
                      msg.isIncoming
                        ? 'self-start bg-device-bubble-in text-device-bubble-in-text'
                        : 'self-end bg-device-bubble-out text-device-bubble-out-text'
                    )}
                  >
                    <p className="m-0">{msg.text}</p>
                    {msg.time && (
                      <span className="text-xs opacity-75 block text-right mt-1">
                        {msg.time}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CHANNEL: Chat Application */}
          {channel === 'chat' && (
            <div className="flex flex-col flex-1 bg-device-bg">
              <div className="p-3 px-4 bg-slate-200 border-b border-device-border">
                <div className="font-bold text-base text-ink">{senderName}</div>
                <div className="text-xs text-ink-muted">Online · Unknown contact</div>
              </div>

              <div className="p-4 flex-1 flex flex-col gap-3">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className="bg-device-bubble-in text-device-bubble-in-text p-3 px-4 rounded-panel max-w-[85%] text-base leading-relaxed"
                  >
                    <p className="m-0">{msg.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CHANNEL: Browser Popup Alert */}
          {channel === 'popup' && (
            <div className="flex flex-col flex-1 bg-rose-50 border-2 border-stop-red">
              <div className="bg-stop-red text-white p-2 px-4 font-bold text-sm tracking-wide">
                CRITICAL SECURITY ALERT - DO NOT CLOSE
              </div>
              <div className="p-4 flex-1 flex flex-col gap-3 text-rose-900">
                <h4 className="text-lg font-bold text-rose-950">{senderName}</h4>
                {messages.map((msg, idx) => (
                  <p key={idx} className="text-sm leading-relaxed">
                    {msg.text}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* CHANNEL: Email Message */}
          {channel === 'email' && (
            <div className="flex flex-col flex-1 bg-device-bg">
              <div className="p-3 px-4 bg-panel border-b border-device-border">
                <div className="text-xs text-ink-muted">From: {senderName}</div>
                <div className="font-bold text-base text-ink mt-0.5">
                  {senderSubtitle || 'Urgent: Action required on your account'}
                </div>
              </div>
              <div className="p-4 flex-1">
                {messages.map((msg, idx) => (
                  <p key={idx} className="text-sm leading-relaxed text-ink">
                    {msg.text}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Screen Reader and Visible Caption */}
      <figcaption className="mt-2 text-xs text-ink-muted text-left font-semibold">
        {caption}
      </figcaption>
    </figure>
  );
}
