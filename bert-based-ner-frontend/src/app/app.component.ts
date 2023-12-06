// src/app/app.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputText = '';
  conversations: any[] = [];
  loading = false;

  constructor(private http: HttpClient) {}

  handleTextChange(event: any): void {
    this.inputText = event.target.value;
  }
async handleNerRequest(): Promise<void> {
  try {
    this.loading = true;

    // Create a new conversation entry for the user input
    const userConversation = { id: Date.now(), type: 'user', text: this.inputText };
    this.conversations = [...this.conversations, userConversation];

    // Simulate a delay (1 second) to represent backend processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Fetch the response from the backend
    const response: any = await this.http.post('http://localhost:8000/tokenize', { text: this.inputText }).toPromise();

    // Extract the relevant information from the response
    const responseData = response.message || response;

    // Format the response for better display
    const formattedResponse = this.formatBotResponse(responseData);

    // Create a new conversation entry for the bot response
    const botConversation = { id: Date.now(), type: 'bot', text: formattedResponse };
    this.conversations = [...this.conversations, botConversation];
  } catch (error) {
    console.error('Error fetching response:', error);

    // Create a new conversation entry for the error response
    const errorConversation = { id: Date.now(), type: 'error', text: (error as any).toString() };
    this.conversations = [...this.conversations, errorConversation];
  } finally {
    this.loading = false;
    this.inputText = '';
  }
}

// Add a helper method to format the bot response
formatBotResponse(responseData: any): string {
  if (Array.isArray(responseData) && responseData.length > 0) {
    const formattedResponse = responseData.map((entity, index) => {
      return `<br>${index + 1}:
      <br>Entity: ${entity.entity}
      <br>Name: ${entity.word}
      <br>Start: ${entity.start}
      <br>End: ${entity.end}
      <br>Score: ${entity.score}
`;
    }).join('');

    return formattedResponse;
  } else {
    return 'No entities found in the response.';
  }
}





}
