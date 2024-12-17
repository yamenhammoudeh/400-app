export async function shareGameResults(
  teamId: number,
  player1Name: string,
  player2Name: string,
  player1Score: number,
  player2Score: number,
  totalRounds: number,
  highestBid: number
): Promise<void> {
  const shareText = `🏆 Team ${teamId} won the 400 card game!\n` +
    `Winners: ${player1Name} and ${player2Name}\n` +
    `Final Score: ${player1Score} & ${player2Score}\n` +
    `Rounds Played: ${totalRounds}\n` +
    `Highest Bid: ${highestBid}`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: '400 Card Game Results',
        text: shareText,
      });
    } else {
      await navigator.clipboard.writeText(shareText);
      alert('Results copied to clipboard!');
    }
  } catch (error) {
    console.error('Error sharing:', error);
  }
}