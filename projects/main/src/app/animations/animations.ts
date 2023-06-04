import { trigger, state, style, transition, animate, AnimationTriggerMetadata } from '@angular/animations';

export const animations: Record<string, AnimationTriggerMetadata> = {
    slideIn:  trigger('slideIn', [
        transition(':enter', [
          style({
            opacity: '10%',
            transform: 'translate(-5%)'
          }),
          animate('300ms ease-in', style({
            opacity: '100%',
            transform: 'translate(0%)'
          }))
        ])
    ]),
    openClose: trigger('openClose', [
        state(
          'closed',
          style({
            visibility: 'hidden',
            right: '-400px',
          })
        ),
        state(
          'open',
          style({
            right: '100px',
          })
        ),
        transition('open <=> closed', [animate('0.5s ease-in-out')]),
    ])
};
